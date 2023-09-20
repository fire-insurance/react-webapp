import { ReactNode, useMemo, useState } from 'react';
import { ModalComponent, ModalControl, modalContext } from './modalContext';
import { AnyObject } from '../../../../types/anyObject';

const DEFAULT_TRANSITION = 500;

export const ModalProvider = ({ children }: {children: ReactNode}) => {
    const [ activeModal, setActiveModal ] = useState<JSX.Element | null>(null);
    const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false);

    const useModal = <P extends AnyObject>(modal: ModalComponent<P>): ModalControl<P> => {
        const Element = modal;

        const handleEscapePress = ({ code }: KeyboardEvent) => {
            code === 'Escape' && close();
        };

        const open = (props: P) => {
            setActiveModal((
                <Element
                    onClose={close}
                    {...props}
                />
            ));
            document.addEventListener('keydown', handleEscapePress, { once: true });
            setIsModalVisible(true);
        };

        const close = () => {
            setIsModalVisible(false);
            setTimeout(() => setActiveModal(null), DEFAULT_TRANSITION);
        };

        return [ open, close ];
    };

    const memorized = useMemo(() => ({
        useModal,
        activeModal,
        isModalVisible,
    }), [ activeModal, isModalVisible ]);

    return (
        <modalContext.Provider
            value={memorized}
        >
            {children}
        </modalContext.Provider>
    );
};
