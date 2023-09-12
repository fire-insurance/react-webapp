import { ParagraphSkeleton } from '@/z-shared/ui/skeleton';
import s from './input.skeleton.module.scss';
import { AppTypography } from '@/z-shared/types/appTypography';

export const InputSkeleton = () => (
    <fieldset className={s['skeleton']}>
        <legend className={s['legend']}/>
        <div className={s['label']}>
            <ParagraphSkeleton
                className={AppTypography.CAPTION_MINI}
                lastLineWidth={'100'}
            />
        </div>
    </fieldset>
);
