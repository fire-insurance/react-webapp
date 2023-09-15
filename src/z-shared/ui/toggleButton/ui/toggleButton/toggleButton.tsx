import { FC, useMemo, useRef } from 'react';
import s from './toggleButton.module.scss';
import { v4 as uuid } from 'uuid';
import clsx from 'clsx';
import { AccentColors } from '@/z-shared/types/appColors';
import { ToggleButtonProps, ToggleButtonVariant, ToggleButtonSize } from '../../lib/types/toggleButtonTypes';
import { generateToggleButtonCssVar } from '../../lib/utils/generateToggleButtonCssVar';
import { useActiveIndicator } from '@/z-shared/lib/hooks/useActiveIndicator/useActiveIndicator';

// toDo: i`m running out of time, but there is need for
// underline button active animation + checked hover color
// and refactor styles and css variables
export const ToggleButton: FC<ToggleButtonProps> = props => {
    const {
        text, variant = ToggleButtonVariant.OUTLINE, theme = AccentColors.ACCENT, size = ToggleButtonSize.L,
        className, id: propId, ...rest
    } = props;
    const id = useRef(propId ?? uuid());
    const toggleButtonVar = useMemo(() => generateToggleButtonCssVar(variant, theme), [ variant, theme ]);
    const labelRef = useActiveIndicator<HTMLLabelElement>(
        { backgroundColor: theme, disabled: variant === ToggleButtonVariant.UNDERLINE },
    );

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
                ref={labelRef}
            >
                <span>
                    {text}
                </span>
            </label>
        </>
    );
};
