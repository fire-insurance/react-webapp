import { AppTypography } from '@/z-shared/types/appTypography';
import { ParagraphSkeleton, Skeleton, SkeletonVariant } from '../skeleton';
import s from './dataChip.module.scss';
import { DataChipSize } from './types/dataChipTypes';
import clsx from 'clsx';

interface DataChipSkeletonProps {
    expectedLineQuantity?: number;
    size?: DataChipSize;
}

export const DataChipSkeleton = ({ expectedLineQuantity = 1, size = DataChipSize.L }: DataChipSkeletonProps) => (
    <div className={clsx(s['chip-skeleton'], s[`chip-skeleton--${size}`])}>
        <Skeleton
            className={s['icon-skeleton']}
            variant={SkeletonVariant.CIRCLE}
        />
        <ParagraphSkeleton
            className={size === DataChipSize.L ? AppTypography.CAPTION : AppTypography.CAPTION_MINI}
            lineQuantity={expectedLineQuantity}
            lastLineWidth={expectedLineQuantity === 1 ? '100' : '25'}
        />
    </div>
);
