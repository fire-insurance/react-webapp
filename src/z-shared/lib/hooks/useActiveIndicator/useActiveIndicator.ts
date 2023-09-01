import { useEffect, useRef } from 'react';
import s from './activeIndicator.module.scss';
import { ScreenEvent, getScreenEventPosition } from '../../utils/getScreenEventPosition';
import { initialAnimation, initialAnimationId, exitAnimationId, exitAnimation } from './const/animations';
import { getInteractionEventKeys } from './utils/getInteractionEventKeys';

/**
 * Возвращает ref заданного типа.
 * На ref навешивает слушатель на событие "нажатия" (click/touch).
 * По нажатию отрисовывает на элементе расширяющуюся окружность.
 * @note
 * Элемент, для которого передается ref должен иметь position: relative
 */
export const useActiveIndicator = <T extends HTMLElement>() => {
    const elementRef = useRef<T | null>();
    const activeIndicatorSet = useRef<Set<HTMLDivElement>>(new Set());
    const interactionEventKeys = useRef(getInteractionEventKeys());

    // Навешиваем на элемент слушатель на событие нажатия
    useEffect(() => {
        if (!elementRef.current) return;
        const [ initialEventKey ] = interactionEventKeys.current;

        elementRef.current.addEventListener(initialEventKey, appendIndicator, { passive: true });

        return () => {
            elementRef.current.removeEventListener(initialEventKey, appendIndicator);
        };
    }, []);

    /**
     * Обрабатывает событие нажатия.
     * Получает координаты клика/тача и координаты ноды, на которую навешан слушатель.
     * Вычисляет координаты клика относительно ноды и отрисовывает по этим координатам пустой div.
     * div получает анимацию расширяющейся окружности.
     */
    const appendIndicator = (e: ScreenEvent) => {
        const element = elementRef!.current;
        const { x, y } = element.getBoundingClientRect();
        const { x: eventX, y: eventY } = getScreenEventPosition(e);

        const [ _, exitEventKey ] = interactionEventKeys.current;
        window.addEventListener(exitEventKey, clearIndicators, { once: true });

        const indicator = document.createElement('div');
        indicator.setAttribute('class', s['indicator']);
        indicator.style.left = `${eventX - x}px`;
        indicator.style.top = `${eventY - y}px`;
        indicator.animate(...initialAnimation);

        activeIndicatorSet.current.add(indicator);
        element.appendChild(indicator);
    };

    /**
     * Мы можем единовременно иметь несколько индикаторов. При снятии нажатия, сносим их все
     */
    const clearIndicators = () => {
        activeIndicatorSet.current.forEach(removeIndicator);
        activeIndicatorSet.current.clear();
    };

    /**
     * После завершения анимации расширения навесить анимацию исчезновения
     */
    const removeIndicator = (indicator: HTMLDivElement) => {
        const animations = indicator.getAnimations();
        const initial = animations.find(it => it.id === initialAnimationId);
        const exit = animations.find(it => it.id === exitAnimationId);

        if (!initial) return;
        if (!exit) {
            initial.playState === 'finished'
                ? appendExitAnimation(indicator)
                : initial.onfinish = () => appendExitAnimation(indicator);
        }
    };

    /**
     * Анимированное исчезновение и удаление ноды из DOM
     */
    const appendExitAnimation = (indicator: HTMLDivElement) => {
        const exit = indicator.animate(...exitAnimation);
        exit.onfinish = () => indicator.remove();
    };

    return elementRef;
};
