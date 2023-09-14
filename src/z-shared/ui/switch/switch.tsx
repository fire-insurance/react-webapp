import { InputHTMLAttributes, forwardRef, useRef } from 'react';
import s from './switch.module.scss';
import { v4 as uuid } from 'uuid';
import clsx from 'clsx';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string;
    justify?: 'gap' | 'space-between';
}

// toDo: возможно, сделать анимацию цвеиа текста при наведении. Либо избавиться от такой анимации в чекбоксе
// toDo: skeleton
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    ({ text, className, justify = 'space-between', id: propId, ...rest }, ref) => {
        const id = useRef(propId ?? uuid());

        return (
            <>
                <input
                    type={'checkbox'}
                    id={id.current}
                    ref={ref}
                    className={'visually-hidden'}
                    {...rest}
                />
                <label
                    className={clsx(
                        s['container'],
                        s[`container--${justify}`],
                        className,
                    )}
                >
                    {text ?? null}
                    <label
                        className={s['custom-switch-checkbox']}
                        htmlFor={id.current}
                    >
                        <div/>
                    </label>
                </label>
            </>
        );
    });
