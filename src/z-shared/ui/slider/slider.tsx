import { useCallback, useEffect, useRef, useState } from 'react';
import s from './slider.module.scss';
import clsx from 'clsx';
import { SliderProps } from './lib/types/types';
import { createPercentToStepFn } from './lib/utils/utils';
import { Mark } from './ui/sliderMark/sliderMark';
import { SharedScreenEvent, getScreenEventPosition } from '../../lib/utils/getScreenEventPosition';

// toDo:
// cleanup
// resizeObserver
// click anywhere to set state
// Навешивать только один слушатель (тач/клик), в зависимости от платформы. + навешивать одноразовый (once)
// слушатель на завершение интеракции
export const Slider = (
    { boundaries, marks = [], step = 1, value, showStepTooltip = true, getMarkLabel, onChange }: SliderProps,
) => {
    const [ min, max ] = [ boundaries?.[0] ?? 0, boundaries?.[1] ?? 100 ];

    const containerWidth = useRef<number>(1);
    const interactionStartAbscissa = useRef<number | null>(null);
    const abortControllerRef = useRef<AbortController>(new AbortController());
    const cachedThumbMovePercentage = useRef<number>(0);
    const valueCache = useRef<number>(0);

    const [ isInteracting, setIsInteracting ] = useState(false);
    const [ thumbMovePercentage, setThumbMovePercentage ] = useState(0);

    useEffect(() => {
        valueCache.current = value;
        setIsInteracting(prev => {
            // мы хотим обновлять положение сладера при изменении значения извне,
            // но не хотим вызывать эту функцию когда сами меняем значение
            // прокручивая слайдер
            !isInteracting && getDefaultThumbPosition(value);
            return prev;
        });
    }, [ value ]);

    const percentToStep = createPercentToStepFn([ min, max ], step);

    const containerRefCallback = (node: HTMLDivElement | null) => {
        if (!node) return;
        containerWidth.current = node.getBoundingClientRect().width;
    };

    const getDefaultThumbPosition = (val: number) => {
        const movePercentage = val / max * 100;
        cachedThumbMovePercentage.current = movePercentage;
        setThumbMovePercentage(movePercentage);
    };

    const handleInteractionStart = (e: SharedScreenEvent) => {
        setIsInteracting(true);
        interactionStartAbscissa.current = getScreenEventPosition(e).x;

        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        const options: AddEventListenerOptions = { signal: abortController.signal };

        window.addEventListener('mousemove', e => handleInteraction(e.clientX), options);
        window.addEventListener('mouseup', handleInteractionEnd, options);
        window.addEventListener('touchmove', e => handleInteraction(e.touches[0].clientX), options);
        window.addEventListener('touchend', handleInteractionEnd, options);
    };

    const handleInteractionEnd = () => {
        setIsInteracting(false);
        interactionStartAbscissa.current = 0;
        abortControllerRef.current.abort();

        // с помощью такого трюка всегда получаем актуальный стейт для записи в кэш
        setThumbMovePercentage(prevState => {
            cachedThumbMovePercentage.current = prevState;
            return prevState;
        });
    };

    const handleInteraction = useCallback((clientX: number) => {
        if (!interactionStartAbscissa.current) return;

        const pixelDifference = clientX - interactionStartAbscissa.current;
        const percentDifference = pixelDifference / containerWidth.current * 100;
        const boundedDifference = Math.min(Math.max(cachedThumbMovePercentage.current + percentDifference, 0), 100);
        const newStep = percentToStep(boundedDifference);

        if (valueCache.current !== newStep) setThumbMovePercentage(Math.floor(newStep / max * 100));

        onChange(newStep);
    }, []);

    return (
        <div className={clsx(s['slider-wrapper'], marks.length && s['slider-wrapper--with-marks'])}>
            <div
                className={s['slider']}
                ref={containerRefCallback}
            >
                {
                    marks.map(mark => (
                        <Mark
                            key={mark}
                            leftPosition={mark / max * 100}
                            label={getMarkLabel ? getMarkLabel(mark) : `${mark}`}
                            isPassed={mark <= value}
                            onClick={() => {
                                onChange(mark);
                                setThumbMovePercentage(Math.floor(mark / max * 100));
                                cachedThumbMovePercentage.current = Math.floor(mark / max * 100);
                            }}
                            isBoudaryMark={mark === min || mark === max}
                        />
                    ))
                }
                <div
                    className={s['slider__track']}
                    style={{ width: `${thumbMovePercentage}%` }}
                />
                <div
                    className={clsx(s['slider__thumb'], isInteracting && s['slider__thumb--active'])}
                    onMouseDown={handleInteractionStart}
                    onTouchStart={handleInteractionStart}
                    style={{ left: `${thumbMovePercentage}%` }}
                >
                    {
                        showStepTooltip && (
                            <p className={clsx(s['step-tooltip'], 'caption')}>
                                {value}
                            </p>
                        )
                    }
                </div>
            </div>
        </div>
    );
};
