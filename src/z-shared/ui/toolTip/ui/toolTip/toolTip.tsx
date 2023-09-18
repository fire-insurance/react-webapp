import InfoIcon from '@/z-shared/assets/icons/info.svg';
import s from './toolTip.module.scss';
import { useState } from 'react';
import { ToolTipPopUp } from '../toolTipPopUp/toolTipPopUp';
import useBooleanState from '@/z-shared/lib/hooks/useBooleanState';

interface ToolTipProps {
    tip: string;
    text?: string;
}

export const ToolTip = ({ tip, text }: ToolTipProps) => {
    const [ visible, setVisible, setNotVisible ] = useBooleanState(false);

    return (
        <div
            className={s['container']}
            onMouseEnter={setVisible}
            onMouseLeave={setNotVisible}
            onClick={setVisible}
            onBlur={setNotVisible}
        >
            {
                text && (
                    <span className={s['text']}>
                        {text}
                    </span>
                )
            }
            <div className={s['icon-wrapper']}>
                <InfoIcon/>
                <ToolTipPopUp
                    isVisible={visible}
                    text={tip}
                />
            </div>
        </div>
    );
};
