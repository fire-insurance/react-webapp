import { AccentColors } from '@/z-shared/types/appColors';
import { ButtonHTMLAttributes, CSSProperties } from 'react';

export enum ButtonVariant {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    FLAT = 'flat',
    THIN = 'thin',
    GHOST = 'ghost',
}

export enum ButtonSize {
    L = 'l',
    S = 's',
}

export interface BaseButtonProps {
    variant?: ButtonVariant;
    text?: string;
    icon?: JSX.Element | SVGComponent;
    secondaryIcon?: JSX.Element | SVGComponent;
    iconAlignment?: 'left' | 'right';
    size?: ButtonSize;
    theme?: AccentColors;
    showLoader?: boolean;
    fillContainer?: boolean;
}

export type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export interface ButtonCSSProperties extends CSSProperties {
    '--content-color': string;
    '--content-hover-color': string;
    '--bg-color': string;
    '--bg-hover-color': string;
}
