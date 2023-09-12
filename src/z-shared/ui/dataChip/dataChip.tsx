import Warning from '@/z-shared/assets/icons/warning.svg';
import Info from '@/z-shared/assets/icons/info.svg';
import CheckCircle from '@/z-shared/assets/icons/check-circle.svg';
import s from './dataChip.module.scss';
import clsx from 'clsx';
import { DataChipSize, DataChipVariant } from './types/dataChipTypes';
import { forwardRef } from 'react';

interface DataChipProps {
    text: string;
    variant: DataChipVariant;
    size?: DataChipSize;
    className?: string;
}

export const DataChip = forwardRef<HTMLDivElement, DataChipProps>((props, ref) => {
    const { text, variant, size = DataChipSize.L, className } = props;

    const icon = (() => {
        switch (variant) {
            case DataChipVariant.ERROR:
                return <Warning/>;
            case DataChipVariant.SUCCESS:
                return <CheckCircle/>;
            default:
                return <Info/>;
        }
    })();

    return (
        <div
            className={clsx(s['chip'], s[`chip--${variant}`], s[`chip--${size}`], className)}
            ref={ref}
        >
            {icon}
            <span>
                {text}
            </span>
        </div>
    );
});
