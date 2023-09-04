import s from './skeleton.module.scss';
import { WithClassName } from '@/z-shared/types/withClassname';
import clsx from 'clsx';
import { FC } from 'react';

export enum SkeletonVariant {
    RECT = 'rect',
    SQUARE = 'square',
    CIRCLE = 'circle',
}

interface SkeletonProps extends Required<WithClassName> {
    variant?: SkeletonVariant;
    /**
     * Является ли этот скелет вложенным в другой селект (ex: скелет иконки в скелете кнопки)
     */
    composite?: boolean;
}

export const Skeleton: FC<SkeletonProps> = ({ variant = SkeletonVariant.RECT, children, composite, className }) => (
    <div
        className={clsx(
            s['skeleton'],
            s[`skeleton--${variant}`],
            s[`skeleton--${composite ? 'composite' : 'base'}`],
            className,
        )}
    >
        { children ?? <>&nbsp;</> }
    </div>
);
