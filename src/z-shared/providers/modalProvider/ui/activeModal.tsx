import { useModalContext } from '../lib/hooks/useModal';

export const ActiveModal = () => useModalContext()?.activeModal ?? null;
