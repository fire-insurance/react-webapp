import { ButtonHTMLAttributes, HTMLInputTypeAttribute, InputHTMLAttributes, forwardRef, useRef } from 'react';
import s from './input.module.scss';
import { BaseButtonProps, ButtonVariant } from '../button/types/buttonTypes';
import { v4 as uuid } from 'uuid';
import { Button } from '../button';
import clsx from 'clsx';
import { DataChip, DataChipSize, DataChipVariant } from '../dataChip';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>
type InputType = Extract<HTMLInputTypeAttribute, 'email' | 'number' | 'password' | 'search' | 'text' | 'tel'>

interface InputProps extends Omit<NativeInputProps, 'type'>{
    label?: string;
    background?: 'primary' | 'secondary';
    icon?: JSX.Element;
    button?: Pick<BaseButtonProps, 'icon'> & ButtonHTMLAttributes<HTMLButtonElement>;
    helperText?: string;
    errorText?: string;
    type?: InputType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { label, background = 'primary', icon = null, button, helperText, errorText, id: propId, ...rest } = props;
    const id = useRef(propId ?? uuid());

    const inputDataChip = (() => {
        if (errorText) return { text: errorText, variant: DataChipVariant.ERROR };
        if (helperText) return { text: helperText, variant: DataChipVariant.INFO };
        return null;
    })();

    return (
        <div className={s['container']}>
            <div className={clsx(s['input-wrapper'], s[`input-wrapper--${background}`])}>
                {/* {
                    label && (
                        <legend className={s['legend']}>
                            {label}
                        </legend>
                    )
                } */}
                {
                    icon && (
                        <div className={s['input-icon-wrapper']}>
                            {icon}
                        </div>
                    )
                }
                <input
                    className={s['input']}
                    id={id.current}
                    ref={ref}
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
            {
                inputDataChip && (
                    <DataChip
                        variant={inputDataChip.variant}
                        text={inputDataChip.text}
                        size={DataChipSize.S}
                    />
                )
            }
        </div>
    );
});
