import { ParagraphSkeleton, Skeleton, SkeletonVariant } from '../../skeleton';
import s from '../checkbox.module.scss';
import { ParagraphSkeletonProps } from '../../skeleton/paragraph.skeleton';

interface CheckboxSkeletonProps extends Pick<ParagraphSkeletonProps, 'lastLineWidth'> {
    text?: boolean;
}

export const CheckboxSkeleton = ({ text, lastLineWidth }: CheckboxSkeletonProps) => (
    <div className={s['container']}>
        <Skeleton
            variant={SkeletonVariant.SQUARE}
            className={s['checkbox-skeleton']}
        />
        {
            text && (
                <ParagraphSkeleton
                    className={s['label-skeleton']}
                    lastLineWidth={lastLineWidth}
                />
            )
        }
    </div>
);
