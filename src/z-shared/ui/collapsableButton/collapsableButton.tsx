import { useEffect, useRef } from 'react';
import { Button } from '../button';
import { ButtonProps } from '../button/types/buttonTypes';
import useBooleanState from '@/z-shared/lib/hooks/useBooleanState';
import getCssVariable, { CSSVar } from '@/z-shared/lib/utils/getCssVariable';

interface CollapsableButtonProps extends ButtonProps {
    collapsed: boolean;
}

// toDo: сделать анимацию расширения и сужения текста
// с помощью ref.current.span.animate
export const CollapsableButton = ({ collapsed, text, ...rest }: CollapsableButtonProps) => {
    const [ showText, , , toggle ] = useBooleanState(!collapsed);
    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        if (collapsed) {
            toggle();
            return;
        }
        setTimeout(toggle, getCssVariable(CSSVar.APP_TRANSITION));
    }, [ collapsed ]);

    return (
        <Button
            text={showText ? text : undefined}
            {...rest}
        />
    );
};
