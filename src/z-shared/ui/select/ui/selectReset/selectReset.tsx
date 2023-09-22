import { Button, ButtonSize, ButtonVariant } from '../../../../ui/button';
import Cross from '../../../../assets/icons/cross.svg';
import AngleDown from '../../../../assets/icons/angle-down.svg';
import s from './selectReset.module.scss';
import clsx from 'clsx';

interface SelectResetProps {
    isOpen: boolean;
    onReset?: () => void;
}

export const SelectReset = ({ isOpen, onReset }: SelectResetProps) => (
    <div className={s['container']}>
        {
            onReset && (
                <Button
                    variant={ButtonVariant.GHOST}
                    size={ButtonSize.S}
                    icon={Cross}
                    onMouseDown={e => {
                        e.stopPropagation();
                        onReset();
                    }}
                />
            )
        }
        <AngleDown className={clsx(s['angle'], 'flipabble', isOpen && 'flipabble--flipped')}/>
    </div>
);
