import { CSSProperties, FocusEvent, forwardRef, useEffect, useRef, useState } from 'react';
import s from './input.module.scss';
import { ButtonVariant } from '../button/types/buttonTypes';
import { v4 as uuid } from 'uuid';
import { Button } from '../button';
import clsx from 'clsx';
import { InputProps } from './types/inputTypes';
import {
    legendAnimationKeyframes, labelAnimationOptions,
    createLabelAnimationKeyframes, LabelAnimationKeyframe,
} from './lib/const/animations';
import { InputDataChip } from './ui/inputDataChip/inputDataChip';
import { createRefCallbackForForwardedRef } from '@/z-shared/lib/utils/createRefCallbackForForwardedRef';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
    const {
        label, background = 'primary', icon: Icon = null,
        button, helperText, errorText, id: propId, ...rest
    } = props;
    const id = useRef(propId ?? uuid());
    const fieldsetRef = useRef<HTMLFieldSetElement | null>(null);
    const legendRef = useRef<HTMLLegendElement | null>(null);
    const labelRef = useRef<HTMLLabelElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const animationsRef = useRef<Animation[]>([]);
    const isInputFilled = useRef<boolean>(!!rest.value || !!rest.defaultValue);
    const [ dataChipHeight, setDataChipHeight ] = useState(0);

    useEffect(() => {
        const labelAnimationKeyframes = createLabelAnimation();
        if (!labelAnimationKeyframes) return;

        const [ labelKeyframes, legendKeyframes ] = (() => {
            if (isInputFilled.current) {
                fieldsetRef.current?.classList.toggle(s['fieldset--input-filled']);
                return [ labelAnimationKeyframes.reverse(), [ ...legendAnimationKeyframes ].reverse() ];
            }
            return [ labelAnimationKeyframes, legendAnimationKeyframes ];
        })();

        const appendedAnimation = labelRef.current?.animate(labelKeyframes, labelAnimationOptions);
        const legendAnim = legendRef.current?.animate(legendKeyframes, labelAnimationOptions);

        if (!appendedAnimation || !legendAnim) return;
        appendedAnimation.finish();
        legendAnim.finish();
        animationsRef.current = [ appendedAnimation, legendAnim ];
    }, []);

    const createLabelAnimation = (): Keyframe[] | null => {
        if (!inputRef.current || !fieldsetRef.current || !labelRef.current || !legendRef.current) return null;
        const { x: fieldSetX } = fieldsetRef.current.getBoundingClientRect();
        const { x: inputX, height: inputHeight } = inputRef.current.getBoundingClientRect();
        const { height: labelHeight } = labelRef.current.getBoundingClientRect();
        const { x: legendX } = legendRef.current.getBoundingClientRect();

        const from: LabelAnimationKeyframe = { left: legendX - fieldSetX, top: -labelHeight / 2 };
        const to: LabelAnimationKeyframe = { left: inputX - fieldSetX - 1, top: (inputHeight - labelHeight) / 2 };

        return createLabelAnimationKeyframes(from, to);
    };

    const animateFocus = (e: FocusEvent<HTMLInputElement>) => {
        isInputFilled.current = !!e.target.value;

        if (!animationsRef.current || !labelRef.current || isInputFilled.current) return;
        fieldsetRef.current?.classList.toggle(s['fieldset--input-filled']);
        animationsRef.current.forEach(animation => animation.reverse());
    };

    return (
        <div
            className={clsx(s['container'], dataChipHeight && s['container--with-helper'])}
            style={{ '--data-chip-height': `${dataChipHeight}px` } as CSSProperties}
        >
            <fieldset
                className={clsx(s['fieldset'], errorText && s['fieldset--error'])}
                ref={fieldsetRef}
            >
                {
                    label && (
                        <>
                            <legend
                                className={s['legend']}
                                ref={legendRef}
                            >
                                {label}
                            </legend>
                            <label
                                htmlFor={id.current}
                                className={s['label']}
                                ref={labelRef}
                            >
                                {label}
                            </label>
                        </>
                    )
                }
                <div className={clsx(s['input-wrapper'], s[`input-wrapper--${background}`])}>
                    {
                        Icon && (
                            <div className={s['input-icon-wrapper']}>
                                { typeof Icon === 'function' ? <Icon/> : Icon }
                            </div>
                        )
                    }
                    <input
                        className={s['input']}
                        id={id.current}
                        ref={createRefCallbackForForwardedRef(inputRef, forwardedRef)}
                        onFocus={animateFocus}
                        onBlur={animateFocus}
                        {...rest}
                    />
                    {
                    button && (
                        <Button
                            variant={ButtonVariant.GHOST}
                            {...button}
                        />
                    )
                }
                </div>
            </fieldset>
            <InputDataChip
                helperText={helperText}
                errorText={errorText}
                onHeightChange={setDataChipHeight}
            />
        </div>
    );
});
