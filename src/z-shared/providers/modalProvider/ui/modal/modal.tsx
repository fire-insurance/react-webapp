import { ReactNode } from 'react';
import s from './modal.module.scss';
import clsx from 'clsx';
import { Button, ButtonSize, ButtonVariant } from '../../../../ui/button';
import Cross from '../../../../assets/icons/cross.svg';
import { useModalContext } from '../../lib/hooks/useModal';
import { useOutsideClick } from '../../../../lib/hooks/useOutsideClick';

export interface ModalProps {
    children: ReactNode;
    title: string | JSX.Element;
    onClose: () => void;
    className?: string;
}

export const Modal = ({ children, title, className, onClose }: ModalProps) => {
    const isModalVisible = useModalContext()?.isModalVisible;
    const modalWrapperRef = useOutsideClick<HTMLDivElement>(onClose);

    return (
        <section
            className={clsx(
                s['container'],
                isModalVisible && s['container--visible'],
            )}
        >
            <div
                className={s['modal']}
                ref={modalWrapperRef}
            >
                <header className={s['header']}>
                    <h5>
                        {title}
                    </h5>
                    <Button
                        size={ButtonSize.S}
                        variant={ButtonVariant.GHOST}
                        onClick={onClose}
                        icon={Cross}
                    />
                </header>
                <div className={clsx(s['content'], className)}>
                    {children}
                </div>
            </div>
        </section>
    );
};
