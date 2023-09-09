/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonHTMLAttributes, HTMLInputTypeAttribute, InputHTMLAttributes, forwardRef, useRef } from 'react';
import s from './input.module.scss';
import { BaseButtonProps, ButtonVariant } from '../button/types/buttonTypes';
import { v4 as uuid } from 'uuid';
import { Button } from '../button';

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
    const { label, background, icon = null, button, helperText, errorText, id: propId, ...rest } = props;
    const id = useRef(propId ?? uuid());

    return (
        <div className={s['input-container']}>
            <fieldset className={s['fieldset']}>
                {
                    label && (
                        <legend className={s['legend']}>
                            {label}
                        </legend>
                    )
                }
                <div className={s['input-icon-wrapper']}>
                    {icon}
                    <input
                        className={s['input']}
                        id={id.current}
                        ref={ref}
                        {...rest}
                    />
                </div>
                {
                    button && (
                        <Button
                            variant={ButtonVariant.GHOST}
                            {...button}
                        />
                    )
                }
            </fieldset>
        </div>
    );
});
