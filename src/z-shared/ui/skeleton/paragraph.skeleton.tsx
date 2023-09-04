import clsx from 'clsx';
import styles from './paragraphSkeleton.module.scss';
import { Skeleton, SkeletonVariant } from './skeleton';
import { createDummyArray } from '@/z-shared/lib/utils/createDummyArray';
import { AppTypography } from '@/z-shared/types/appTypography';
import { WithAutocomplete } from '@/z-shared/types/withAutocomplete';

/**
 * Скелет параграфа текста
 * @param lineQuantity количество строк.
 * @param className имя текстового класса. Позволяет задать высоту строки.
 * Может быть составной строкой e.g. clsx(AppTypography.H1, 'class')
 * @param lastLineWidth ширина последней строки (в %).
 * @param composite Является ли этот скелет вложенным в другой селект (ex: скелет текста в скелете кнопки)
 */
export interface ParagraphSkeletonProps {
    lineQuantity?: number;
    className: WithAutocomplete<AppTypography>;
    lastLineWidth?: '25' | '50' | '75' | '100';
    composite?: boolean;
}

export const ParagraphSkeleton = (
    { lineQuantity = 1, className, composite, lastLineWidth = '25' }: ParagraphSkeletonProps,
) => (
    <div
        className={clsx(
            styles['paragraph-skeleton'],
            styles[`paragraph-skeleton--last-line-${lastLineWidth}`],
            className,
        )}
    >
        {
            createDummyArray(lineQuantity).map((_, index) =>
                <Skeleton
                    variant={SkeletonVariant.RECT}
                    className={className}
                    composite={composite}
                    key={index}
                />,
            )
        }
    </div>
);
