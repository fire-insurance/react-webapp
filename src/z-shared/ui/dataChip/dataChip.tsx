import Warning from '@/z-shared/assets/icons/warning.svg';
import Info from '@/z-shared/assets/icons/info.svg';
import CheckCircle from '@/z-shared/assets/icons/check-circle.svg';
import s from './dataChip.module.scss';
import clsx from 'clsx';
import { DataChipSize, DataChipVariant } from './types/dataChipTypes';

interface DataChipProps {
    text: string;
    variant: DataChipVariant;
    size?: DataChipSize;
    className?: string;
}

export const DataChip = ({ text, variant, size = DataChipSize.L, className }: DataChipProps) => {
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
        <div className={clsx(s['chip'], s[`chip--${variant}`], s[`chip--${size}`], className)}>
            {icon}
            <span>
                {text}
            </span>
        </div>
    );
};
