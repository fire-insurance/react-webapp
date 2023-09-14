import clsx from 'clsx';
import s from '../slider.module.scss';
import { createDummyArray } from '../../../lib/utils/createDummyArray';
import { Skeleton, ParagraphSkeleton, SkeletonVariant } from '../../skeleton';

interface SliderSkeletonProps {
    marksQuantity?: number;
}

export const SliderSkeleton = ({ marksQuantity }: SliderSkeletonProps) => (
    <div className={clsx(s['skeleton'], marksQuantity && s['skeleton--with-marks'])}>
        <div className={s['skeleton__bg']}/>
        <Skeleton className={s['skeleton__track']}/>
        <Skeleton
            className={s['skeleton__thumb']}
            variant={SkeletonVariant.CIRCLE}
        />
        {
            !!marksQuantity && (
                <div className={s['marks-skeleton-wrapper']}>
                    {
                        createDummyArray(marksQuantity).map((_, index) => (
                            <ParagraphSkeleton
                                className={'caption'}
                                lastLineWidth={'100'}
                                key={index}
                            />
                        ))
                    }
                </div>
            )
        }
    </div>
);
