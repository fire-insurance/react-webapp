import { InputProps } from '../types/inputTypes';

export const isButtonProps = (
    buttonProp: Exclude<InputProps['button'], undefined>,
): buttonProp is Exclude<InputProps['button'], JSX.Element | undefined> =>
    'icon' in buttonProp;
