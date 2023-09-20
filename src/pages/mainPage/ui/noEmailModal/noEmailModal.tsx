/* eslint-disable i18next/no-literal-string */
import clsx from 'clsx';
import styles from './noEmailModal.module.scss';
import { Suspense } from 'react';
import NoEmailModalSkeleton from './noEmailModal.skeleton';
import { BaseModalProps, Modal } from '@/z-shared/providers/modalProvider';
import { Button } from '@/z-shared/ui/button';

type NoEmailModalProps = {
    userEmail: string;
} & BaseModalProps;

const NoEmailModalBase = ({ userEmail, onClose }: NoEmailModalProps) => (
    <>
        <p className={'subtitle'}>
            Код отправлен на вашу электронную почту. Если вы не получили код, попробуйте:
        </p>
        <ol className={styles['list']}>
            <li>Проверьте папку «спам».</li>
            <li>
                {`Проверить, что вы указали верный адрес электронной почты: ${userEmail}`}
            </li>
            <li>Подождать несколько минут. Код может прийти не сразу.</li>
        </ol>
        <Button
            text={'Ок'}
            onClick={onClose}
            fillContainer={true}
        />
    </>
);

const NoEmailModal = (props: NoEmailModalProps) => (
    <Modal
        title={'Не получили письмо?'}
        onClose={props.onClose}
        className={clsx(styles['content'], 'text')}
    >
        <Suspense fallback={<NoEmailModalSkeleton/>}>
            <NoEmailModalBase {...props}/>
        </Suspense>
    </Modal>
);

export default NoEmailModal;
