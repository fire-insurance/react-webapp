import { ButtonHTMLAttributes, FocusEvent, HTMLInputTypeAttribute, InputHTMLAttributes, forwardRef, useEffect, useRef } from 'react';
import s from './input.module.scss';
import { BaseButtonProps, ButtonVariant } from '../button/types/buttonTypes';
import { v4 as uuid } from 'uuid';
import { Button } from '../button';
import clsx from 'clsx';
import { DataChip, DataChipSize, DataChipVariant } from '../dataChip';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>
type InputType = Extract<HTMLInputTypeAttribute, 'email' | 'number' | 'password' | 'search' | 'text' | 'tel'>

interface InputProps extends Omit<NativeInputProps, 'type'>{
    label?: string;
    background?: 'primary' | 'secondary';
    icon?: JSX.Element | SVGComponent;
    button?: Pick<BaseButtonProps, 'icon'> & ButtonHTMLAttributes<HTMLButtonElement>;
    helperText?: string;
    errorText?: string;
    type?: InputType;
}

interface LabelAnimationKeyframe {
    left: number;
    top: number;
}

export const initialAnimationDuration = 150;
export const labelAnimationId = 'labelAnimation';

const labelAnimationOptions: KeyframeAnimationOptions = {
    duration: initialAnimationDuration,
    iterations: 1,
    id: labelAnimationId,
    fill: 'both',
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
};

const createLabelAnimationKeyframes = (from: LabelAnimationKeyframe, to: LabelAnimationKeyframe): Keyframe[] => [
    { left: `calc(${from.left}px + 0.5ch - 1px)`, top: `${from.top}px` },
    { left: `${to.left}px`, top: `${to.top}px` },
];

const legendAnimationKeyframes = [
    { width: 'max-content', padding: '0 0.5ch' },
    { width: '0', padding: '0' },
];

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
    const animationRef = useRef<Animation[]>([]);
    const isInputFilled = useRef<boolean>(!!rest.value || !!rest.defaultValue);

    const inputDataChip = (() => {
        if (errorText) return { text: errorText, variant: DataChipVariant.ERROR };
        if (helperText) return { text: helperText, variant: DataChipVariant.INFO };
        return null;
    })();

    useEffect(() => {
        const labelAnimationKeyframes = createLabelAnimation();
        if (!labelAnimationKeyframes) return;

        const [ labelKeyframes, legendKeyframes ] = (() => {
            console.log(isInputFilled.current);

            if (isInputFilled.current) {
                fieldsetRef.current?.classList.toggle(s['fieldset--input-filled']);
                return [ labelAnimationKeyframes.reverse(), [ ...legendAnimationKeyframes ].reverse() ];
            }
            return [ labelAnimationKeyframes, legendAnimationKeyframes ];
        })();

        console.log(labelKeyframes, legendKeyframes);

        const appendedAnimation = labelRef.current?.animate(labelKeyframes, labelAnimationOptions);
        const legendAnim = legendRef.current?.animate(legendKeyframes, labelAnimationOptions);

        if (!appendedAnimation || !legendAnim) return;
        appendedAnimation.finish();
        legendAnim.finish();
        animationRef.current = [ appendedAnimation, legendAnim ];
    }, []);

    const createLabelAnimation = (): Keyframe[] | null => {
        if (!inputRef.current || !fieldsetRef.current || !labelRef.current || !legendRef.current) return null;
        const { x: fieldSetX } = fieldsetRef.current.getBoundingClientRect();
        const { x: inputX, height: inputHeight } = inputRef.current.getBoundingClientRect();
        const { height: labelHeight } = labelRef.current.getBoundingClientRect();
        const { x: legendX } = legendRef.current.getBoundingClientRect();

        const from: LabelAnimationKeyframe = { left: legendX - fieldSetX, top: -labelHeight / 2 };
        const to: LabelAnimationKeyframe = { left: inputX - fieldSetX - 1, top: (inputHeight - labelHeight) / 2 };

        const keyframes = createLabelAnimationKeyframes(from, to);

        return keyframes;
    };

    const animateFocus = (e: FocusEvent<HTMLInputElement>) => {
        isInputFilled.current = !!e.target.value;

        if (!animationRef.current || !labelRef.current || isInputFilled.current) return;
        fieldsetRef.current?.classList.toggle(s['fieldset--input-filled']);
        animationRef.current.forEach(animation => animation.reverse());
    };

    return (
        <div className={s['container']}>
            <fieldset
                className={s['fieldset']}
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
                        ref={node => {
                            inputRef.current = node;
                            if (forwardedRef) {
                                typeof forwardedRef === 'function'
                                    ? forwardedRef(node)
                                    : forwardedRef.current = node;
                            }
                        }}
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
            {
                inputDataChip && (
                    <DataChip
                        variant={inputDataChip.variant}
                        text={inputDataChip.text}
                        size={DataChipSize.S}
                    />
                )
            }
        </div>
    );
});
