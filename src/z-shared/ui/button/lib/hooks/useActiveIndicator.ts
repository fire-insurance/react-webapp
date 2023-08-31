import { useEffect, useRef } from 'react';
import s from './activeIndicator.module.scss';
import { exitAnimation, exitAnimationId, initialAnimation, initialAnimationId } from './const/animations';

export const useActiveIndicator = <T extends HTMLElement>() => {
    const elementRef = useRef<T | null>();
    const activeIndicatorSet = useRef<Set<HTMLDivElement>>(new Set());
    const abortControllerRef = useRef(new AbortController());

    useEffect(() => {
        if (!elementRef.current) return;
        const signal = abortControllerRef.current.signal;

        elementRef.current.addEventListener('mousedown', appendIndicator, { signal });
        elementRef.current.addEventListener('mouseup', clearIndicators, { signal });
        elementRef.current.addEventListener('touchstart', appendIndicator, { passive: true, signal });
        elementRef.current.addEventListener('touchend', e => {
            // отключаем эмуляюцию mouseEvent за ненадобностью
            e.preventDefault();
            clearIndicators();
        }, { signal });

        return () => {
            abortControllerRef.current.abort();
        };
    }, []);

    const appendIndicator = (e: MouseEvent) => {
        const element = elementRef!.current;
        console.log(e);

        const { x, y } = element.getBoundingClientRect();
        console.log(x, y);

        const { clientX, clientY } = e;

        const indicator = document.createElement('div');
        indicator.setAttribute('class', s['indicator']);
        indicator.style.left = `${clientX - x}px`;
        indicator.style.top = `${clientY - y}px`;
        indicator.animate(...initialAnimation);

        activeIndicatorSet.current.add(indicator);
        element.appendChild(indicator);
    };

    const clearIndicators = () => {
        activeIndicatorSet.current.forEach(removeIndicator);
        activeIndicatorSet.current.clear();
    };

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

    const appendExitAnimation = (indicator: HTMLDivElement) => {
        const exit = indicator.animate(...exitAnimation);
        exit.onfinish = () => indicator.remove();
    };

    return elementRef;
};
