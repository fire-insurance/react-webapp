import s from './button.module.scss';
import clsx from 'clsx';
import { ButtonProps, ButtonSize, ButtonVariant } from './types/buttonTypes';
import { useMemo } from 'react';
import { generateButtonCssVar } from './lib/utils/generateButtonCssVar';
import { useActiveIndicator } from '../../lib/hooks/useActiveIndicator/useActiveIndicator';
import { Loader } from '../loader/loader';
import { IconWrapper } from './ui/iconWrapper';

export const Button = (props: ButtonProps) => {
    const {
        className, variant = ButtonVariant.PRIMARY, size = ButtonSize.L, theme, iconAlignment = 'left', type = 'button',
        icon: Icon = null, secondaryIcon: SecondaryIcon, fillContainer, onClick, showLoader, text, ...rest
    } = props;

    const disableActiveIndicator = showLoader || variant === ButtonVariant.FLAT || variant === ButtonVariant.THIN;
    const buttonRef = useActiveIndicator<HTMLButtonElement>(disableActiveIndicator);
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
            type={type}
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
            <IconWrapper
                createWrapper={!!Icon && !!text}
                iconAlignment={iconAlignment}
                justifyCenter={!SecondaryIcon}
            >
                { typeof Icon === 'function' ? <Icon/> : Icon }
                {
                    text && (
                        <span>
                            {text}
                        </span>
                    )
                }
            </IconWrapper>
            { typeof SecondaryIcon === 'function' ? <SecondaryIcon/> : SecondaryIcon }
        </button>
    );
};
