import clsx from 'clsx';
import { ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import { SelectProps } from '../../lib/types/select';
import useSelect from '../../lib/hooks/useSelect';
import { Input } from '../../../../ui/input';
import s from './select.module.scss';
import { SelectReset } from '../selectReset/selectReset';

const SelectComponent = <T extends string>(props: SelectProps<T>, ref: ForwardedRef<HTMLDivElement>) => {
    const {
        label,
        options,
        disabled,
        className,
        background = 'secondary',
        iconComponent = null,
        inputComponent = null,
        emptyOptionsComponent = null,
    } = props;

    const {
        optionsMapCallback,
        selectedValueLabel,
        nativeInputProps,
        inputId,
        selectContainerRef,
        openState: { isOpen, openSelect, toggleSelect },
        keyDownHandler,
        blurHandler,
        escapeKeyHandler,
    } = useSelect<T, HTMLDivElement>(props);

    useImperativeHandle(ref, () => selectContainerRef.current as HTMLDivElement, []);

    const onReset = () => {
        if (props.value !== undefined && props.preventDeselect) return;
        props.onChange(undefined);
    };

    return (
        <div
            className={clsx(
                s['select'],
                isOpen && s['select--opened'],
                disabled && s['select--disabled'],
                className,
            )}
            ref={selectContainerRef}
            onKeyDown={e => {
                keyDownHandler(e);
                escapeKeyHandler(e);
            }}
            onBlur={blurHandler}
            onMouseDown={disabled ? undefined : toggleSelect}
        >
            {
                inputComponent ?? (
                    <Input
                        label={label}
                        id={inputId.current}
                        value={selectedValueLabel}
                        readOnly={true}
                        icon={iconComponent ?? undefined}
                        onFocus={openSelect}
                        background={background}
                        className={s['input']}
                        button={(
                            <SelectReset
                                isOpen={isOpen}
                                onReset={onReset}
                            />
                        )}
                        {...nativeInputProps}
                    />
                )
            }
            <div
                className={clsx(s['options'], s[`options--${background}`])}
                // блокируем всплытие события до контейнера
                onMouseDown={e => e.stopPropagation()}
            >
                {
                    options.length
                        ? options.map(optionsMapCallback)
                        : emptyOptionsComponent
                }
            </div>
        </div>
    );
};

/**
 * Функция для создания кастомного селекта с дженериком для ключей options
 * и поддержкой forwardRef
 */
export const createGenericSelect = <T extends string>() =>
    forwardRef<HTMLDivElement, SelectProps<T>>(SelectComponent);

/**
 * Дефолтный селект, ключи options могут быть любым строковым значением
 */
export const Select = forwardRef<HTMLDivElement, SelectProps<string>>(SelectComponent);
