import { CSSProperties, FocusEvent, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import s from './input.module.scss';
import { ButtonVariant } from '../button/types/buttonTypes';
import { v4 as uuid } from 'uuid';
import { Button } from '../button';
import clsx from 'clsx';
import { InputProps } from './types/inputTypes';
import {
    legendAnimationKeyframes, labelAnimationOptions,
    createLabelAnimationKeyframes, LabelAnimationKeyframe,
} from './lib/const/animations';
import { InputDataChip } from './ui/inputDataChip/inputDataChip';
import { createRefCallbackForForwardedRef } from '@/z-shared/lib/utils/createRefCallbackForForwardedRef';
import { useDebounce } from '@/z-shared/lib/hooks/useDebounce';

// toDo: рефактор пошел не по плану 🤡
// компонент настолько усложнился, что просто пиздец, я подыхаю от этих анимаций.
// надо спокойно посидеть и потестировать все это говно.
// known problems:
// 1) Инпут пустой, мы фокусимся на него, затем в пропс value/defaultValue попадает значение
// и лейбл уезжает вниз!!!!
// 2) Блядский legend не ресайзится нормально в состоянии эллипсиса. ResizeObserver это прям overkill,
// можно обойтись width: 100% - 'x'px;
// 3) autocomplete скорее всего все сломает
export const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
    const {
        label, background = 'primary', icon: Icon = null,
        button, helperText, errorText, id: propId, onBlur, onFocus, ...rest
    } = props;
    const id = useRef(propId ?? uuid());
    const fieldsetRef = useRef<HTMLFieldSetElement | null>(null);
    const legendRef = useRef<HTMLLegendElement | null>(null);
    const labelRef = useRef<HTMLLabelElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isInitialRender = useRef<boolean>(true);
    const animationsRef = useRef<Animation[]>([]);
    const [ isInActiveView, setIsInActiveView ] = useState<boolean>(!!rest.value);
    const [ dataChipHeight, setDataChipHeight ] = useState(0);
    const [ inputWidth, setInputWidth ] = useState(0);

    useEffect(() => {
        if (!inputRef.current) return;
        const observer = new ResizeObserver(debouncedObserverCallback);
        observer.observe(inputRef.current);

        return () => {
            inputRef.current && observer.unobserve(inputRef.current);
        };
    }, []);

    const observerCallback = useCallback((entries: ResizeObserverEntry[]) => {
        const inputWidth = entries.at(0)?.borderBoxSize[0]?.inlineSize;

        inputWidth && setInputWidth(inputWidth);
    }, []);

    const debouncedObserverCallback = useDebounce(observerCallback, 10);

    useEffect(() => {
        const labelAnimationKeyframes = createLabelAnimation();
        if (!labelAnimationKeyframes) return;

        const [ labelKeyframes, legendKeyframes ] = (() => {

            if (isInActiveView) {
                return [ labelAnimationKeyframes.reverse(), [ ...legendAnimationKeyframes ].reverse() ];
            }
            return [ labelAnimationKeyframes, legendAnimationKeyframes ];
        })();

        const appendedAnimation = labelRef.current?.animate(labelKeyframes, labelAnimationOptions);
        const legendAnim = legendRef.current?.animate(legendKeyframes, labelAnimationOptions);

        if (!appendedAnimation || !legendAnim) return;
        appendedAnimation.finish();
        legendAnim.finish();
        animationsRef.current = [ appendedAnimation, legendAnim ];
    }, []);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        handleActiveStateChange(!!rest.value);
    }, [ rest.value, rest.defaultValue ]);

    const createLabelAnimation = (): Keyframe[] | null => {
        if (!inputRef.current || !fieldsetRef.current || !labelRef.current || !legendRef.current) return null;
        const { x: fieldSetX } = fieldsetRef.current.getBoundingClientRect();
        const { x: inputX, height: inputHeight } = inputRef.current.getBoundingClientRect();
        const { height: labelHeight } = labelRef.current.getBoundingClientRect();
        const { x: legendX } = legendRef.current.getBoundingClientRect();

        const from: LabelAnimationKeyframe = { left: legendX - fieldSetX, top: -labelHeight / 2 };
        const to: LabelAnimationKeyframe = { left: inputX - fieldSetX - 1, top: (inputHeight - labelHeight) / 2 };

        return createLabelAnimationKeyframes(from, to);
    };

    const handleFocusEvent = (e: FocusEvent<HTMLInputElement>) => {
        handleActiveStateChange(!!e.target.value);
    };

    const handleActiveStateChange = (isInputFilled: boolean) => {
        setIsInActiveView(prev => {
            if (!animationsRef.current || isInputFilled && prev) return prev;

            animationsRef.current.forEach(animation => animation.reverse());
            return !prev;
        });
    };

    return (
        <div
            className={clsx(s['container'], dataChipHeight && s['container--with-helper'])}
            style={{ '--data-chip-height': `${dataChipHeight}px`, '--input-width': `${inputWidth}px` } as CSSProperties}
        >
            <fieldset
                className={clsx(
                    s['fieldset'],
                    errorText && s['fieldset--error'],
                    !label && s['fieldset--no-label'],
                    isInActiveView && s['fieldset--input-filled'],
                )}
                ref={fieldsetRef}
            >
                {
                    label && (
                        <>
                            <legend
                                className={s['legend']}
                                ref={legendRef}
                            >
                                {label}
                            </legend>
                            <label
                                htmlFor={id.current}
                                className={s['label']}
                                ref={labelRef}
                            >
                                {label}
                            </label>
                        </>
                    )
                }
                <div className={clsx(s['input-wrapper'], s[`input-wrapper--${background}`])}>
                    {
                        Icon && (
                            <div className={s['input-icon-wrapper']}>
                                { typeof Icon === 'function' ? <Icon/> : Icon }
                            </div>
                        )
                    }
                    <input
                        className={s['input']}
                        id={id.current}
                        ref={createRefCallbackForForwardedRef(inputRef, forwardedRef)}
                        onFocus={e => {
                            handleFocusEvent(e);
                            onFocus && onFocus(e);
                        }}
                        onBlur={e => {
                            handleFocusEvent(e);
                            onBlur && onBlur(e);
                        }}
                        {...rest}
                    />
                    {
                        button && (
                            <Button
                                variant={ButtonVariant.GHOST}
                                {...button}
                            />
                        )
                    }
                </div>
            </fieldset>
            <InputDataChip
                helperText={helperText}
                errorText={errorText}
                onHeightChange={setDataChipHeight}
            />
        </div>
    );
});
