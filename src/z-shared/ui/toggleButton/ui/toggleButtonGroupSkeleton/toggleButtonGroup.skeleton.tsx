import { Skeleton } from '../../../skeleton';
import { createDummyArray } from '../../../../lib/utils/createDummyArray';
import s from '../toggleButtonGroup/toggleButtonGroup.module.scss';
import clsx from 'clsx';

interface ToggleButtonGroupSkeletonProps {
    buttonQuantity: number;
    buttonClassname?: string;
}

export const ToggleButtonGroupSkeleton = ({ buttonQuantity, buttonClassname }: ToggleButtonGroupSkeletonProps) => (
    <div className={s['toggle-buttons']}>
        {createDummyArray(buttonQuantity).map((_, index) => (
            <Skeleton
                key={index}
                className={clsx(s['skeleton'], buttonClassname)}
            />
        ))}
    </div>
);
