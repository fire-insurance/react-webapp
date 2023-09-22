import { ForwardedRef, forwardRef } from 'react';
import { Button, ButtonVariant } from '../../../button';
import s from './selectOption.module.scss';
import { Checkbox } from '@/z-shared/ui/checkbox';
import { SelectOptionProps } from '../../lib/types/select';
import clsx from 'clsx';

export const SelectOption = forwardRef((
    { selected, secondaryIcon, multi, ...rest }: SelectOptionProps,
    ref: ForwardedRef<HTMLButtonElement>,
) => {
    const rightIcon = secondaryIcon ?? multi ? (
        <Checkbox
            value={undefined}
            tabIndex={-1}
            onClick={e => e.preventDefault()}
            checked={selected}
            readOnly={true}
        />
    ) : undefined;

    return (
        <Button
            variant={ButtonVariant.GHOST}
            className={clsx(
                s['option'],
                selected && s['option--selected'],
            )}
            secondaryIcon={rightIcon}
            ref={ref}
            fillContainer={true}
            {...rest}
        />
    );
});
