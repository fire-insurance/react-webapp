import { useRef } from 'react';
import { createMediaQuery } from '../../useMediaQuery/utils/createMediaQuery';

type InitialInteractionEventKey = keyof Pick<HTMLElementEventMap, 'mousedown' | 'touchstart'>;
type ExitInteractionEventKey = keyof Pick<HTMLElementEventMap, 'mouseup' | 'touchend'>;

export type InteractionEventKeyTuple = [
    initEventKey: InitialInteractionEventKey, exitEventKey: ExitInteractionEventKey
];

/**
 * Возвращает ключи для add/remove EventListener. Возвращаемые ключи применяются для обработки интерактива
 * "нажатия" - клик на десктопе и тач на touch устройствах
 */
export const getInteractionEventKeys = (): InteractionEventKeyTuple => {
    const isTouchDevice = useRef(createMediaQuery('(hover: none)').matches);

    return isTouchDevice.current
        ? [ 'touchstart', 'touchend' ]
        : [ 'mousedown', 'mouseup' ];
};
