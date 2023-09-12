import { ForwardedRef, MutableRefObject, RefCallback } from 'react';

/**
 * Функция возвращает `RefCallback` для элемента с типом `T`.
 * Функция полезна, в случае, если нам нужно получить два рефа для одного и того же элемента:
 * один внутри компонента и один извне (forwardedRef)
 * @example
 * ```typescript JSX
 * export const Component = forwardRef<HTMLInputElement, any>((props, forwardedRef) => {
 *     const inputRef = useRef<HTMLInputElement | null>(null);
 *
 *     return <input ref={createRefCallbackForForwardedRef(inputRef, forwardedRef)}/>
 * })
 * ```
 */
export const createRefCallbackForForwardedRef = <T extends HTMLElement>(
    ref: MutableRefObject<T | null>, forwardedRef: ForwardedRef<T | null> | null,
): RefCallback<T> => (node: T) => {
    ref.current = node;
    if (forwardedRef) {
        typeof forwardedRef === 'function'
            ? forwardedRef(node)
            : forwardedRef.current = node;
    }
};
