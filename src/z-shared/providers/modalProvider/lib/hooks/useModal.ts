import { useContext } from 'react';
import { modalContext, ModalComponent } from '../context/modalContext';
import { AnyObject } from '../../../../types/anyObject';

export const useModalContext = () => useContext(modalContext);

export const useModal = <P extends AnyObject>(modal: ModalComponent<P>) =>
    useContext(modalContext)!.useModal(modal);
