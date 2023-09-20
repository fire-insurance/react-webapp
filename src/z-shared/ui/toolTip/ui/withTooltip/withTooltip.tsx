import { FC } from 'react';
import useBooleanState from '../../../../lib/hooks/useBooleanState';
import { ToolTipPopUp, ToolTipPopUpAlignment } from '../toolTipPopUp/toolTipPopUp';
import { WithClassName } from '../../../../types/withClassname';

interface WithTooltipProps extends WithClassName {
    tip: string;
    align?: ToolTipPopUpAlignment;
    showOnCondition?: boolean;
}

// Мне не совсем нравится реализация. Возможно есть резон попробовать предыдущую версию
// с хуком, который навешивает слушатели события и вызывает глобальный тултип через провайдер :thinking:
export const WithTooltip: FC<WithTooltipProps> = ({ children, tip, className, align, showOnCondition = true }) => {
    const [ visible, setVisible, setNotVisible ] = useBooleanState(false);

    return (
        <div
            className={className}
            onMouseEnter={setVisible}
            onMouseLeave={setNotVisible}
            style={{ position: 'relative' }}
        >
            {children}
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: '0',
                top: '0',
            }}
            >
                {
                    showOnCondition && (
                        <ToolTipPopUp
                            isVisible={visible}
                            text={tip}
                            align={align}
                        />
                    )
                }
            </div>
        </div>
    );
};
