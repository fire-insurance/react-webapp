import ToolTipNeedle from '@/z-shared/assets/icons/needle.svg';
import { RefCallback, useCallback, useEffect, useRef, useState } from 'react';
import s from './toolTipPopUp.module.scss';
import useBooleanState from '@/z-shared/lib/hooks/useBooleanState';
import clsx from 'clsx';

interface ToolTipPopUpProps {
    isVisible: boolean;
    text: string;
}

const sideOffset = 16;

export const ToolTipPopUp = ({ isVisible, text }: ToolTipPopUpProps) => {
    const [ tipLeft, setTipLeft ] = useState<number>(0);
    const [ localIsVisible, setLocalIsVisible, setLocalNotVisible ] = useBooleanState(isVisible);
    const observerRef = useRef<ResizeObserver | null>(null);
    const tipRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        observerRef.current = new ResizeObserver(observerCallback);

        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    const observerCallback = (entries: ResizeObserverEntry[]) => {
        if (!tipRef.current || !containerRef.current) return;

        const { right: toolTipRight, width: tooltipWidth, left: toolTipLeft } =
            tipRef.current?.getBoundingClientRect();
        const { right: windowRight } = entries[0].contentRect;

        // максимально допустимое значение toolTipRight
        const maxRight = windowRight - sideOffset;

        // максимально допустимое значение toolTipLeft
        const maxLeft = sideOffset;

        // отклонение от фактического положения от макс. допустимого (слева/справа)
        const overflowRight = maxRight - toolTipRight;
        const overflowLeft = toolTipLeft - maxLeft;

        // позиция по умолчанию (по центру)
        const defaultPosition = -tooltipWidth / 2;

        setTipLeft(prev => {
            if (!prev) return defaultPosition;
            if (overflowLeft === 0 && overflowRight === 0) return prev;

            // максимально допустимое отклонение (после него бокс тултипа начинает уезжать за needle)
            const maxAllowed = tooltipWidth - sideOffset / 2;

            // floor нужен чтобы убрать погрешность при сложении floating point
            // если его убрать, то тултип может прыгать если overflowLeft стремится к нулю
            return Math.floor(overflowLeft) <= 0
                ? Math.min(Math.max(prev - overflowLeft, defaultPosition), maxAllowed)
                : Math.max(Math.min(prev + overflowRight, defaultPosition), -1 * maxAllowed);
        });
    };

    // так как у нас регулярно удаляется/добавляется в DOM элемент тултипа,
    // используем refCallback
    const refCallback: RefCallback<HTMLDivElement> = useCallback(node => {
        // если тултип появился, записываем его в реф, устанавливаем ему дефолнтное положение отн. оси X
        // (по центру), и начинаем отслеживать resize документа.
        if (node) {
            tipRef.current = node;
            setTipLeft(-1 * node.getBoundingClientRect().width / 2);
            observerRef.current?.observe(document.body);
            return;
        }
        // если тултип убран из DOM, перастаем отслеживать resize документа за ненадобностью
        observerRef.current?.unobserve(document.body);
        tipRef.current = null;
    }, []);

    // локальный стейт нужен, чтобы анимация fadeOut исполнилась до конца
    // перед тем, как мы удалим из DOM содержимое тултипа
    useEffect(() => {
        if (isVisible) return setLocalIsVisible();
        setTimeout(setLocalNotVisible, 350);
    }, [ isVisible ]);

    return (
        <div
            className={clsx(s['container'], isVisible && s['container--active'])}
            ref={containerRef}
        >
            {
                localIsVisible && (
                    <>
                        <div
                            className={s['tip-wrapper']}
                            style={{ left: `${tipLeft}px` }}
                            ref={refCallback}
                        >
                            <div
                                className={s['tip']}

                            >
                                {text}
                            </div>
                        </div>
                        <ToolTipNeedle className={s['needle']}/>
                    </>
                )
            }
        </div>
    );
};
