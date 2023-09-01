import s from './button.module.scss';
import clsx from 'clsx';
import { ButtonProps, ButtonSize, ButtonVariant } from './types/buttonTypes';
import { useMemo } from 'react';
import { generateButtonCssVar } from './lib/utils/generateButtonCssVar';
import { useActiveIndicator } from '../../lib/hooks/useActiveIndicator/useActiveIndicator';
import { Loader } from '../loader/loader';

// 4) Скелетон
export const Button = (props: ButtonProps) => {
    const {
        className, variant = ButtonVariant.PRIMARY, size = ButtonSize.L, theme, iconAlignment = 'left',
        icon: Icon, secondaryIcon: SecondaryIcon, fillContainer, onClick, showLoader, text, ...rest
    } = props;

    const buttonRef = useActiveIndicator<HTMLButtonElement>(showLoader);
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
                    [s['button--loading']]: showLoader,
                },
                className,
            )}
            style={buttonVar}
            onClick={showLoader ? undefined : onClick}
            ref={buttonRef}
            {...rest}
        >
            {
                showLoader && (
                    <Loader
                        className={s['button-loader']}
                        style={buttonVar}
                    />
                )
            }
            <div className={clsx(s['icon-wrapper'], s[`icon-wrapper_align--${iconAlignment}`])}>
                { Icon ?? null }
                {text}
            </div>
            { SecondaryIcon ?? null }
        </button>
    );
};
