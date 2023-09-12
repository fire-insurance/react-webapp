import { InputHTMLAttributes, HTMLInputTypeAttribute, ButtonHTMLAttributes } from 'react';
import { BaseButtonProps } from '../../button';

export type NativeInputProps = InputHTMLAttributes<HTMLInputElement>
export type InputType = Extract<HTMLInputTypeAttribute, 'email' | 'number' | 'password' | 'search' | 'text' | 'tel'>

export interface InputProps extends Omit<NativeInputProps, 'type'>{
    label?: string;
    background?: 'primary' | 'secondary';
    icon?: JSX.Element | SVGComponent;
    button?: Pick<BaseButtonProps, 'icon'> & ButtonHTMLAttributes<HTMLButtonElement>;
    helperText?: string;
    errorText?: string;
    type?: InputType;
}
