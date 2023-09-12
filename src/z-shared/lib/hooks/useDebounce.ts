import { useCallback, useRef } from 'react';

export const useDebounce = <T extends any[]>(callback: (...args: [...T]) => void, delay: number) => {
    const timer = useRef<NodeJS.Timeout | null>(null);

    return useCallback((...args: [...T]) => {
        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [ callback, delay ]);
};
