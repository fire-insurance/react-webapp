import ToolTipNeedle from '@/z-shared/assets/icons/needle.svg';
import { useEffect, useRef, useState } from 'react';
import s from './toolTipPopUp.module.scss';
import useBooleanState from '@/z-shared/lib/hooks/useBooleanState';
import { fadeInAnimation } from '../../lib/const/animation';
import clsx from 'clsx';

interface ToolTipPopUpProps {
    isVisible: boolean;
    text: string;
    className?: string;
}

const TIP_SIDE_OFFSET = 16;
const DEFAULT_TIP_POSITION = -TIP_SIDE_OFFSET;

export const ToolTipPopUp = ({ isVisible, text, className }: ToolTipPopUpProps) => {
    const [ tipPosition, setTipPosition ] = useState<number>(DEFAULT_TIP_POSITION);
    const [ localIsVisible, setLocalIsVisible, setLocalNotVisible ] = useBooleanState(isVisible);
    const tipRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!tipRef.current) return;
    }, []);

    useEffect(() => {
        if (isVisible) return setLocalIsVisible();
        setTimeout(setLocalNotVisible, 350);
    }, [ isVisible ]);

    const handleResize = () => {
        if (!tipRef.current) return;

        const { width } = tipRef.current.getBoundingClientRect();

        // const tipWillOverflow = width + TIP_SIDE_OFFSET > iconContainerLeft;

        // setTipPosition(tipWillOverflow ?
        //     iconContainerLeft - width - TIP_SIDE_OFFSET :
        //     DEFAULT_TIP_POSITION,
        // );
    };

    return (
        <div
            className={clsx(s['container'], isVisible && s['container--active'])}
            ref={tipRef}
        >
            {
                localIsVisible && (
                    <>
                        <ToolTipNeedle className={s['needle']}/>
                        <div
                            className={s['tip']}
                            style={{ right: tipPosition }}
                        >
                            {text}
                        </div>
                    </>
                )
            }
        </div>
    );
};
