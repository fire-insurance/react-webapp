import { ParagraphSkeleton, Skeleton } from '../../../skeleton';
import { createDummyArray } from '../../../../lib/utils/createDummyArray';
import s from '../toggleButtonGroup/toggleButtonGroup.module.scss';
import clsx from 'clsx';
import { ToggleButtonSize } from '../../lib/types/toggleButtonTypes';
import { AppTypography } from '@/z-shared/types/appTypography';

interface ToggleButtonGroupSkeletonProps {
    buttonQuantity: number;
    size?: ToggleButtonSize;
    buttonClassname?: string;
}

// toDo: underline button skeleton, not fill
export const ToggleButtonGroupSkeleton = (
    { buttonQuantity, size = ToggleButtonSize.L, buttonClassname }: ToggleButtonGroupSkeletonProps,
) => (
    <div className={s['toggle-buttons']}>
        {createDummyArray(buttonQuantity).map((_, index) => (
            <Skeleton
                key={index}
                className={clsx(s['skeleton'], s[`skeleton--${size}`], buttonClassname)}
            >
                <ParagraphSkeleton
                    className={size === ToggleButtonSize.L ? AppTypography.BTN_LABEL : AppTypography.BTN_LABEL_MINI}
                    lastLineWidth={'100'}
                    composite={true}
                />
            </Skeleton>
        ))}
    </div>
);
