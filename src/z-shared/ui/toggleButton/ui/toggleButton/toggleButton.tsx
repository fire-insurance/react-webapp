import { FC, useMemo, useRef } from 'react';
import s from './toggleButton.module.scss';
import { v4 as uuid } from 'uuid';
import clsx from 'clsx';
import { AccentColors } from '@/z-shared/types/appColors';
import { ToggleButtonProps, ToggleButtonVariant, ToggleButtonSize } from '../../lib/types/toggleButtonTypes';
import { generateToggleButtonCssVar } from '../../lib/utils/generateToggleButtonCssVar';

export const ToggleButton: FC<ToggleButtonProps> = props => {
    const {
        text, variant = ToggleButtonVariant.OUTLINE, theme = AccentColors.ACCENT, size = ToggleButtonSize.L,
        className, id: propId, ...rest
    } = props;
    const id = useRef(propId ?? uuid());
    const toggleButtonVar = useMemo(() => generateToggleButtonCssVar(variant, theme), [ variant, theme ]);

    console.log(text, rest.checked);

    return (
        <>
            <input
                type={'checkbox'}
                id={id.current}
                className={'visually-hidden'}
                {...rest}
            />
            <label
                className={clsx(
                    s['button'],
                    s[`button--${variant}`],
                    s[`button--${size}`],
                    className,
                )}
                style={toggleButtonVar}
                htmlFor={id.current}
            >
                <span>
                    {text}
                </span>
            </label>
        </>

    );
};
