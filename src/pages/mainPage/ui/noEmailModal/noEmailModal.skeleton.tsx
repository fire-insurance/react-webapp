import { ButtonSkeleton, ButtonVariant } from '@/z-shared/ui/button';
import { ParagraphSkeleton } from '@/z-shared/ui/skeleton';
import styles from './noEmailModal.module.scss';

const NoEmailModalSkeleton = () => (
    <>
        <ParagraphSkeleton
            className={'subtitle'}
            lineQuantity={2}
        />
        <ol className={styles['list']}>
            <ParagraphSkeleton
                className={'text'}
                lineQuantity={2}
            />
            <ParagraphSkeleton
                className={'text'}
                lineQuantity={1}
            />
            <ParagraphSkeleton
                className={'text'}
                lineQuantity={1}
            />
        </ol>
        <ButtonSkeleton variant={ButtonVariant.PRIMARY}/>
    </>
);

export default NoEmailModalSkeleton;
