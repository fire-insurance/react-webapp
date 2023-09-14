import React, { ChangeEvent, PropsWithChildren, useCallback, useMemo } from 'react';
import { FC, ReactElement } from 'react';
import s from './toggleButtonGroup.module.scss';
import { ToggleButtonProps } from '../../lib/types/toggleButtonTypes';
import { ToggleButton } from '../toggleButton/toggleButton';

type ToggleButtonGroupProps = {
    name: string;
    children: ReactElement<typeof ToggleButton>[];
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
        value, name, children, onChange, preventDeselect,
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
    }, [ handleValueChange, children, name ]);

    return (
        <fieldset className={s.container}>
            <div className={s['toggle-buttons']}>
                {childrenWithAppendedProps}
            </div>
        </fieldset>
    );
};
