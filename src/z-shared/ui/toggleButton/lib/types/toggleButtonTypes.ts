import { AccentColors } from '@/z-shared/types/appColors';
import { CSSProperties, InputHTMLAttributes } from 'react';

export enum ToggleButtonVariant {
    OUTLINE = 'outline',
    UNDERLINE = 'underline',
}

export enum ToggleButtonSize {
    L = 'l',
    S = 's',
}

export interface ToggleButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    text: string;
    value: string | number;
    variant?: ToggleButtonVariant;
    size?: ToggleButtonSize;
    theme?: AccentColors;
}

export interface ToggleButtonCSSProperties extends CSSProperties {
    '--active-border-color': string;
    '--active-text-color': string;
    '--active-bg-color': string;
    '--text-hover-color': string;
}
