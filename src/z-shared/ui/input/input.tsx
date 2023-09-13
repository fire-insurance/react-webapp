import { CSSProperties, FocusEvent, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import s from './input.module.scss';
import { ButtonVariant } from '../button/types/buttonTypes';
import { v4 as uuid } from 'uuid';
import { Button } from '../button';
import clsx from 'clsx';
import { InputProps } from './types/inputTypes';
import { InputDataChip } from './ui/inputDataChip/inputDataChip';
import { createRefCallbackForForwardedRef } from '@/z-shared/lib/utils/createRefCallbackForForwardedRef';
import { useDebounce } from '@/z-shared/lib/hooks/useDebounce';
import { FieldsetWrapper } from './ui/fieldsetWrapper/fieldsetWrapper';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
    const {
        label, background = 'primary', icon: Icon = null,
        button, helperText, errorText, id: propId, onBlur, onFocus, ...rest
    } = props;
    const id = useRef(propId ?? uuid());
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const iconWrapperRef = useRef<HTMLInputElement | null>(null);

    const [ dataChipHeight, setDataChipHeight ] = useState(0);
    const [ inputWidth, setInputWidth ] = useState(0);
    const [ inputOffset, setInputOffset ] = useState(0);

    const [ isInActiveView, setIsInActiveView ] = useState<boolean>(!!rest.value);
    const [ isInFocus, setIsInFocus ] = useState(false);

    useEffect(() => {
        if (!inputRef.current) return;
        const observer = new ResizeObserver(debouncedObserverCallback);
        observer.observe(inputRef.current);

        return () => {
            inputRef.current && observer.unobserve(inputRef.current);
        };
    }, []);

    useEffect(() => {
        if (!wrapperRef.current || !inputRef.current) return;

        const { x: wrapperX } = wrapperRef.current.getBoundingClientRect();
        const { x: inputX } = inputRef.current.getBoundingClientRect();

        setInputOffset(inputX - wrapperX);
    }, []);

    const observerCallback = useCallback((entries: ResizeObserverEntry[]) => {
        const inputWidth = entries.at(0)?.borderBoxSize[0]?.inlineSize;

        inputWidth && setInputWidth(inputWidth);
    }, []);

    const debouncedObserverCallback = useDebounce(observerCallback, 100);

    useEffect(() => {
        setIsInActiveView(!!rest.value || !!rest.defaultValue);
    }, [ rest.value, rest.defaultValue ]);

    const handleFocus = () => {
        setIsInActiveView(true);
        setIsInFocus(true);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIsInActiveView(!!e.target.value);
        setIsInFocus(false);
    };

    const inlineVariables: CSSProperties = useMemo(() => ({
        '--data-chip-height': `${dataChipHeight}px`,
        '--input-width': `${inputWidth}px`,
        '--input-offset': `${inputOffset}px`,
    } as CSSProperties), [ dataChipHeight, inputOffset, inputWidth ]);

    return (
        <div
            className={clsx(s['container'], dataChipHeight && s['container--with-helper'])}
            style={inlineVariables}
        >
            <div
                className={clsx(
                    s['input-wrapper'],
                    s[`input-wrapper--${background}`],
                    isInActiveView && s['input-wrapper--active-view'],
                    !label && s['input-wrapper--no-label'],
                )}
                ref={wrapperRef}
            >
                <FieldsetWrapper
                    id={id.current}
                    active={isInActiveView}
                    error={!!errorText}
                    label={label}
                    inFocus={isInFocus}
                />
                {
                    Icon && (
                        <div
                            className={s['input-icon-wrapper']}
                            ref={iconWrapperRef}
                        >
                            { typeof Icon === 'function' ? <Icon/> : Icon }
                        </div>
                    )
                }
                <input
                    className={s['input']}
                    id={id.current}
                    ref={createRefCallbackForForwardedRef(inputRef, forwardedRef)}
                    onFocus={e => {
                        handleFocus();
                        onFocus && onFocus(e);
                    }}
                    onBlur={e => {
                        handleBlur(e);
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
            <InputDataChip
                helperText={helperText}
                errorText={errorText}
                onHeightChange={setDataChipHeight}
            />
        </div>
    );
});
