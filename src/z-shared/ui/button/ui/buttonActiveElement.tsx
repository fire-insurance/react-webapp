import s from './buttonActiveElement.module.scss';

interface ButtonActiveElementProps {
    x: number;
    y: number;
}

export const ButtonActiveElement = ({ x, y }: ButtonActiveElementProps) => (
    <div
        className={s['container']}
        style={{ 'left': `${x}px`, 'top': `${y}px` }}
    />
);
