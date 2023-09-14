import s from './progressBar.module.scss';
import { FC, useMemo } from 'react';
import clsx from 'clsx';
import { AccentColors } from '@/z-shared/types/appColors';

type ProgressElement = [value: number, label: string | undefined];

interface ProgressBarProps {
    value: ProgressElement;
    max: ProgressElement;
    color?: AccentColors;
    showOverflow?: boolean;
}

export const ProgressBar: FC<ProgressBarProps> = (
    { color = AccentColors.ACCENT, value: [ value, valueLabel ], max: [ max, maxLabel ], showOverflow },
) => {
    const currentProgress = useMemo(() => {
        // частное от деления
        const quotient = value / max;
        // для floating point остаток от деления может продуцировать очень маленькие экспоненциальные
        // числа в случаях, когда остаток должен быть равен 0.
        // Например 0.05 % 0.01 -> 1.734723475976807e-18 вместо 0
        // поэтому делаем проверку. Если value делится на max нацело -
        // возвращаем max (тогда у нас будет 100% progress). Иначе возвращаем остаток от деления
        const moduledValue = value === 0
            ? 0
            : `${quotient}`.includes('.')
                ? value % max
                : max;

        const percentage = showOverflow
            ? moduledValue / max
            : Math.min(quotient, 1);

        return Math.floor(+percentage.toFixed(3) * 100);
    }, [ value, max, showOverflow ]);

    const valueOverflowing = showOverflow && value > max;

    return (
        <div className={s['container']}>
            {
                valueLabel || maxLabel
                    ? (
                        <div className={clsx(s['label-wrapper'], 'caption')}>
                            <span>
                                {valueLabel}
                            </span>
                            <span>
                                {maxLabel}
                            </span>
                        </div>
                    )
                    : null
            }
            <div
                className={clsx(
                    s['progress-bar'],
                    s[`progress-bar--${color}`],
                    valueOverflowing && s['progress-bar--overflowing'],
                )}
            >
                <div
                    className={s['progress-bar__line']}
                    style={{ width: `${currentProgress}%` }}
                />
            </div>
        </div>
    );
};
