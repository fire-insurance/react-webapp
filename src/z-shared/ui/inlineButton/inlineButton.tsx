import { HTMLAttributes } from 'react';
import s from './inlineButton.module.scss';

interface InlineButtonProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    text: string;
    sidePadding?: boolean;
}

export const InlineButton = ({ text, sidePadding = true, ...rest }: InlineButtonProps) => (
    <span
        className={s['inline-button']}
        {...rest}
    >
        { sidePadding ? ` ${text} ` : text }
    </span>
);
