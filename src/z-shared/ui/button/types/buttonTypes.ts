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

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    text?: string;
    icon?: JSX.Element;
    secondaryIcon?: JSX.Element;
    iconAlignment?: 'left' | 'right';
    size?: ButtonSize;
    theme?: AccentColors;
    showLoader?: boolean;
    fillContainer?: boolean;
}

export interface ButtonCSSProperties extends CSSProperties {
    '--content-color': string;
    '--content-hover-color': string;
    '--bg-color': string;
    '--bg-hover-color': string;
}
