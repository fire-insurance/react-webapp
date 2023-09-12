import { DataChip, DataChipSize, DataChipVariant } from '@/z-shared/ui/dataChip';
import { InputDataChipProps } from '../../types/inputTypes';
import { useEffect, useRef } from 'react';

interface HeighChangeHandler {
    onHeightChange: (height: number) => void;
}

// toDo: resize observer
export const InputDataChip = ({ errorText, helperText, onHeightChange }: InputDataChipProps & HeighChangeHandler) => {
    const dataChipRef = useRef<HTMLDivElement | null>(null);

    const inputDataChip = (() => {
        if (errorText) return { text: errorText, variant: DataChipVariant.ERROR };
        if (helperText) return { text: helperText, variant: DataChipVariant.INFO };
        return null;
    })();

    useEffect(() => {
        if (!dataChipRef.current) {
            onHeightChange(0);
            return;
        }
        onHeightChange(dataChipRef.current.getBoundingClientRect().height);
    }, [ helperText, errorText ]);

    return (
        inputDataChip
            ? (
                <DataChip
                    variant={inputDataChip.variant}
                    text={inputDataChip.text}
                    size={DataChipSize.S}
                    ref={dataChipRef}
                />
            )
            : null
    );
};
