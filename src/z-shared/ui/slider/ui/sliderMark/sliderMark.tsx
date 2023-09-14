import clsx from 'clsx';
import s from './sliderMark.module.scss';

interface SliderMarkProps {
    leftPosition: number;
    isPassed: boolean;
    isBoudaryMark: boolean;
    label?: string;
    onClick: () => void;
}

export const Mark = ({ leftPosition, label, isPassed, isBoudaryMark, onClick }: SliderMarkProps) => (
    <div
        className={clsx(s['mark'], isBoudaryMark && s['mark--boundary'], isPassed && s['mark--passed'])}
        onClick={onClick}
        style={{ left: `${leftPosition}%` }}
    >
        {
            label && (
                <p className={clsx(s['mark__label'], 'caption')}>
                    {label}
                </p>
            )
        }
    </div>
);
