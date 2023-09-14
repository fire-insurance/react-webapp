import clsx from 'clsx';
import s from './checkbox.module.scss';
import { InputHTMLAttributes, forwardRef, useRef } from 'react';
import Check from '@/z-shared/assets/icons/check.svg';
import { v4 as uuid } from 'uuid';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    text?: string;
    className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
    const { text, className, id: propId, ...rest } = props;
    const id = useRef(propId ?? uuid());

    return (
        <>
            <input
                type={'checkbox'}
                id={id.current}
                ref={ref}
                onChange={props.onChange}
                className={'visually-hidden'}
                {...rest}
            />
            <label
                className={clsx(
                    s['container'],
                    className,
                )}
                htmlFor={id.current}
            >
                <div
                    className={s['checkbox']}
                >
                    <Check/>
                </div>
                {text ?? null}
            </label>
        </>
    );
});
