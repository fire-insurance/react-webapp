import React, { ChangeEvent, PropsWithChildren, useCallback, useMemo } from 'react';
import { FC, ReactElement } from 'react';
import s from './toggleButtonGroup.module.scss';
import { ToggleButtonProps, ToggleButtonSize, ToggleButtonVariant } from '../../lib/types/toggleButtonTypes';
import { ToggleButton } from '../toggleButton/toggleButton';
import clsx from 'clsx';

type ToggleButtonGroupProps = {
    name: string;
    children: ReactElement<typeof ToggleButton>[];
    variant: ToggleButtonVariant;
    size?: ToggleButtonSize;
    fillContainer?: boolean;
} & (NoDeselectToggleButton | AllowDeselectToggleButton)

interface NoDeselectToggleButton {
    preventDeselect: true;
    onChange: (value: string) => void;
    value: string;
}

interface AllowDeselectToggleButton {
    preventDeselect?: undefined;
    onChange: (value?: string) => void;
    value?: string;
}

export const ToggleButtonGroup: FC<ToggleButtonGroupProps> = props => {
    const {
        value, name, children, onChange, preventDeselect, variant, fillContainer = true, size = ToggleButtonSize.L,
    } = props;

    const handleValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (preventDeselect) return onChange(newValue);

        const change = onChange as AllowDeselectToggleButton['onChange'];
        change(newValue === value ? undefined : newValue);
    }, [ value, onChange ]);

    const childrenWithAppendedProps = useMemo(() => {
        const propsToToggleButtons: Partial<ToggleButtonProps> = {
            name,
            variant,
            size,
            onChange: handleValueChange,
        };

        return React.Children.map(children, (child, index) => {
            const element = child as ReactElement<PropsWithChildren<ToggleButtonProps>>;

            const propsToAppend: Partial<ToggleButtonProps> = {
                ...propsToToggleButtons,
                onChange: handleValueChange,
                checked: value === element.props.value,
            };

            return React.cloneElement(element, { ...propsToAppend, key: index });
        });
    }, [ handleValueChange, variant, size, children, name ]);

    return (
        <fieldset
            className={clsx(
                s['container'],
                s[`container--${variant}`],
                s[`container--${size}`],
                fillContainer && s['container--fill'],
            )}
        >
            <div className={s['toggle-buttons']}>
                {childrenWithAppendedProps}
            </div>
        </fieldset>
    );
};
