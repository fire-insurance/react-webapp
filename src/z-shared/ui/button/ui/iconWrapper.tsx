import clsx from 'clsx';
import { FC } from 'react';
import { ButtonProps } from '../types/buttonTypes';
import s from './iconWrapper.module.scss';

interface IconWrapperProps extends Pick<ButtonProps, 'iconAlignment'> {
    createWrapper: boolean;
    justifyCenter?: boolean;
}

export const IconWrapper: FC<IconWrapperProps> = ({ createWrapper, iconAlignment, justifyCenter, children }) =>
    createWrapper
        ? (
            <div className={clsx(
                    s['icon-wrapper'],
                    s[`icon-wrapper_align--${iconAlignment}`],
                    justifyCenter && s['icon-wrapper--center'],
                )}
            >
                {children}
            </div>
        )
        : (
            <>
                {children}
            </>
        );
