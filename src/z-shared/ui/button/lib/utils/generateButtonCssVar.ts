import { AccentColors, AppColors } from '@/z-shared/types/appColors';
import { ButtonCSSProperties, ButtonVariant } from '../../types/buttonTypes';

type ColorModifier = {
    bg?: number;
    bgHover?: number;
    content?: number;
    contentHover?: number;
};

/**
 * Генерирует css variables для цветов (фон/контент) кнопки в зависимости от переданной темы и варианта.
 */
export const generateButtonCssVar = (variant: ButtonVariant, theme?: AccentColors): ButtonCSSProperties => {
    switch (variant) {
        case ButtonVariant.PRIMARY: {
            const colorSet = theme ?? AppColors.ACCENT;
            const colorModifierMap: ColorModifier = { bg: 1, bgHover: 2 };

            return constructVarObject(colorSet as AppColors, colorModifierMap);
        }
        case ButtonVariant.SECONDARY: {
            const colorSet = theme ?? AppColors.SECONDARY;
            const contentColorSet = theme ?? AppColors.GRAYSCALE;
            const colorModifierMap: ColorModifier =
                colorSet === AppColors.SECONDARY
                    ? { bg: 1, bgHover: 2, content: 9, contentHover: 9 }
                    : { bg: 6, bgHover: 5, content: 1, contentHover: 1 };

            return constructVarObject(colorSet as AppColors, colorModifierMap, contentColorSet as AppColors);
        }
        case ButtonVariant.FLAT: {
            const colorSet = theme ?? AppColors.ACCENT;
            const colorModifierMap: ColorModifier = { content: 1, contentHover: 2 };

            return constructVarObject(colorSet as AppColors, colorModifierMap);
        }
        case ButtonVariant.THIN: {
            const colorSet = theme ?? AppColors.GRAYSCALE;
            const colorModifierMap: ColorModifier = colorSet === AppColors.GRAYSCALE
                ? { content: 9, contentHover: 10 }
                : { content: 3, contentHover: 1 };

            return constructVarObject(colorSet as AppColors, colorModifierMap);
        }
        case ButtonVariant.GHOST: {
            const colorSet = theme ?? AppColors.SECONDARY;
            const contentColorSet = theme ?? AppColors.GRAYSCALE;
            const colorModifierMap: ColorModifier =
                colorSet === AppColors.SECONDARY
                    ? { bgHover: 2, content: 8, contentHover: 10 }
                    : { bgHover: 6, content: 1, contentHover: 1 };

            return constructVarObject(colorSet as AppColors, colorModifierMap, contentColorSet as AppColors);
        }
    }
};

const constructVarObject = (
    colorSet: AppColors, modifiers: ColorModifier, contentColorSet?: AppColors,
): ButtonCSSProperties => {
    const cntColorSet = contentColorSet ?? colorSet;
    const { bg, bgHover, content, contentHover } = modifiers;
    const defaultBgColor = 'transparent';
    const defaultContentColor = '#fff';

    return {
        '--bg-color': bg ? `var(--${colorSet}-${bg})` : defaultBgColor,
        '--bg-hover-color': bgHover ? `var(--${colorSet}-${bgHover})` : defaultBgColor,
        '--content-color': content ? `var(--${`${cntColorSet}-${content}`})` : defaultContentColor,
        '--content-hover-color': contentHover ? `var(--${`${cntColorSet}-${contentHover}`})` : defaultContentColor,
    };
};
