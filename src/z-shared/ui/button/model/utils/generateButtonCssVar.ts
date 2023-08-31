import { AccentColors, AppColors } from '@/z-shared/types/appColors';
import { ButtonCSSProperties, ButtonVariant } from '../types/buttonTypes';

type ColorModifier = {
    bg?: number;
    bgHover?: number;
    content?: number;
    contentHover?: number;
};

export const generateButtonCssVar = (variant: ButtonVariant, theme?: AccentColors): ButtonCSSProperties => {
    switch (variant) {
        case ButtonVariant.PRIMARY: {
            const colorSet = theme ?? AppColors.ACCENT;
            const colorModifierMap: ColorModifier = { bg: 1, bgHover: 2 };

            return constructVarObject(colorSet as AppColors, colorModifierMap);
        }
        case ButtonVariant.SECONDARY: {
            const colorSet = theme ?? AppColors.SECONDARY;
            const colorModifierMap: ColorModifier =
                colorSet === AppColors.SECONDARY
                    ? { bg: 2, bgHover: 3, content: 9, contentHover: 9 }
                    : { bg: 6, bgHover: 5, content: 1, contentHover: 1 };

            return constructVarObject(colorSet as AppColors, colorModifierMap);
        }
        case ButtonVariant.FLAT: {
            const colorSet = theme ?? AppColors.ACCENT;
            const colorModifierMap: ColorModifier = { content: 1, contentHover: 2 };

            return constructVarObject(colorSet as AppColors, colorModifierMap);
        }
        case ButtonVariant.THIN: {
            const colorSet = theme ?? AppColors.GRAYSCALE;
            const colorModifierMap: ColorModifier = colorSet === AppColors.GRAYSCALE
                ? { content: 10, contentHover: 9 }
                : { content: 4, contentHover: 1 };

            return constructVarObject(colorSet as AppColors, colorModifierMap);
        }
        case ButtonVariant.GHOST: {
            const colorSet = theme ?? AppColors.GRAYSCALE;
            const colorModifierMap: ColorModifier =
                colorSet === AppColors.GRAYSCALE
                    ? { bgHover: 2, content: 9, contentHover: 10 }
                    : { bgHover: 6, content: 1, contentHover: 1 };

            return constructVarObject(colorSet as AppColors, colorModifierMap);
        }
    }
};

const constructVarObject = (colorSet: AppColors, modifiers: ColorModifier): ButtonCSSProperties => {
    const { bg, bgHover, content, contentHover } = modifiers;
    const defaultBgColor = 'transparent';
    const defaultContentColor = '#fff';

    return {
        '--bg-color': bg ? `var(--${colorSet}-${bg})` : defaultBgColor,
        '--bg-hover-color': bgHover ? `var(--${colorSet}-${bgHover})` : defaultBgColor,
        '--content-color': content ? `var(--${`${colorSet}-${content}`})` : defaultContentColor,
        '--content-hover-color': contentHover ? `var(--${`${colorSet}-${contentHover}`})` : defaultContentColor,
    };
};
