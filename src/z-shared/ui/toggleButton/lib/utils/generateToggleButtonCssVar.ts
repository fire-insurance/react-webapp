import { AccentColors, AppColors } from '@/z-shared/types/appColors';
import { ToggleButtonCSSProperties, ToggleButtonVariant } from '../types/toggleButtonTypes';

/**
 * Генерирует css variables для цветов (фон/контент) кнопки в зависимости от переданной темы и варианта.
 */
export const generateToggleButtonCssVar = (
    variant: ToggleButtonVariant, theme?: AccentColors,
): ToggleButtonCSSProperties => {
    const colorSet = theme ?? AppColors.ACCENT;

    switch (variant) {
        case ToggleButtonVariant.OUTLINE: {
            return {
                '--active-bg-color': `var(--${colorSet}-6)`,
                '--active-border-color': `var(--${colorSet}-2)`,
                '--active-text-color': `var(--${colorSet}-1)`,
                '--text-hover-color': `var(--${AppColors.GRAYSCALE}-8)`,
            };
        }
        case ToggleButtonVariant.UNDERLINE: {
            return {
                '--active-bg-color': 'transparent',
                '--active-border-color': `var(--${colorSet}-1)`,
                '--active-text-color': `var(--${AppColors.GRAYSCALE}-12)`,
                '--text-hover-color': `var(--${colorSet}-1)`,
            };
        }
    }
};
