import { ParagraphSkeleton, Skeleton } from '../../skeleton';
import s from '../progressBar.module.scss';
import clsx from 'clsx';

interface ProgressBarSkeletonProps {
    valueLabel: boolean;
    maxLabel: boolean;
}

export const ProgressBarSkeleton = (
    { valueLabel, maxLabel }: ProgressBarSkeletonProps,
) => (
    <div className={s['container']}>
        {
            (valueLabel || maxLabel) && (
                <div className={clsx(s['label-wrapper'], 'caption')}>
                    <ParagraphSkeleton className={'caption'}/>
                    <ParagraphSkeleton className={clsx(s['max-label-skeleton'], 'caption')}/>
                </div>
            )
        }
        <Skeleton
            className={s['progress-bar-skeleton']}
        />
    </div>
);
