import s from './button.module.scss';
import clsx from 'clsx';
import { ButtonProps, ButtonSize, ButtonVariant } from './model/types/buttonTypes';
import { useMemo } from 'react';
import { generateButtonCssVar } from './model/utils/generateButtonCssVar';

export const Button = (props: ButtonProps) => {
    const {
        className, variant = ButtonVariant.PRIMARY, size = ButtonSize.L, theme, iconAlignment = 'left',
        icon: Icon, secondaryIcon: SecondaryIcon, fillContainer, onClick, showLoader, text, ...rest
    } = props;

    const buttonVar = useMemo(() => generateButtonCssVar(variant, theme), [ variant, theme ]);

    return (
        <button
            className={clsx(
                s['button'],
                s[`button_variant--${variant}`],
                s[`button_theme--${theme}`],
                s[`button_size--${size}`],
                {
                    [s['button--square']]: Icon && !text && !SecondaryIcon,
                    [s['button--fill']]: fillContainer,
                },
                className,
            )}
            style={buttonVar}
            onClick={showLoader ? onClick : undefined}
            {...rest}
        >
            <div className={clsx(s['icon-wrapper'], s[`icon-wrapper_align--${iconAlignment}`])}>
                { Icon ?? null }
                {text}
            </div>
            { SecondaryIcon ?? null }
        </button>
    );
};
