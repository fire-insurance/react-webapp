import { InputHTMLAttributes, HTMLInputTypeAttribute, ButtonHTMLAttributes } from 'react';
import { BaseButtonProps } from '../../button';

export type NativeInputProps = InputHTMLAttributes<HTMLInputElement>
export type InputType = Extract<HTMLInputTypeAttribute, 'email' | 'number' | 'password' | 'search' | 'text' | 'tel'>

export interface InputDataChipProps {
    helperText?: string;
    errorText?: string;
}

export interface InputProps extends Omit<NativeInputProps, 'type'>, InputDataChipProps {
    label?: string;
    background?: 'primary' | 'secondary';
    icon?: JSX.Element | SVGComponent;
    button?: Pick<BaseButtonProps, 'icon'> & ButtonHTMLAttributes<HTMLButtonElement>;
    type?: InputType;
}
