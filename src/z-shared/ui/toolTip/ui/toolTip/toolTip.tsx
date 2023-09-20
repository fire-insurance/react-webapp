import InfoIcon from '@/z-shared/assets/icons/info.svg';
import s from './toolTip.module.scss';
import { WithTooltip } from '../withTooltip/withTooltip';
import { ToolTipPopUpAlignment } from '../toolTipPopUp/toolTipPopUp';

interface ToolTipProps {
    tip: string;
    text?: string;
}

export const ToolTip = ({ tip, text }: ToolTipProps) => (
    <WithTooltip
        tip={tip}
        className={s['container']}
        align={ToolTipPopUpAlignment.RIGHT}
    >
        {
            text && (
                <span className={s['text']}>
                    {text}
                </span>
            )
        }
        <InfoIcon/>
    </WithTooltip>
);
