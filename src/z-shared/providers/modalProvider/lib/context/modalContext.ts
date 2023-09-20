import { AnyObject } from '../../../../types/anyObject';
import { JSXElementConstructor, createContext } from 'react';

export interface BaseModalProps {
    onClose: () => void;
}

export type ModalControl<P extends AnyObject> = [
    open: (props: P) => void,
    close: () => void,
]

export type ModalComponent<P extends AnyObject> = JSXElementConstructor<BaseModalProps & P>

export interface ModalContext {
    activeModal: JSX.Element | null;
    isModalVisible: boolean;
    useModal: <P extends AnyObject>(modal: ModalComponent<P>, props?: P) => ModalControl<P>;
}

export const modalContext = createContext<ModalContext | null>(null);
