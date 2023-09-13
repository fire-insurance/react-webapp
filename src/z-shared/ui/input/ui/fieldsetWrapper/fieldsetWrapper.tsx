import clsx from 'clsx';
import s from './fieldsetWrapper.module.scss';

interface FieldsetWrapperProps {
    id: string;
    label?: string;
    active?: boolean;
    error?: boolean;
    inFocus?: boolean;
}

export const FieldsetWrapper = ({ id, label, active, inFocus, error }: FieldsetWrapperProps) => (
    <fieldset
        className={clsx(
            s['fieldset'],
            active && s['fieldset--active'],
            error && s['fieldset--error'],
            inFocus && s['fieldset--in-focus'],
            !label && s['fieldset--no-label'],
        )}
    >
        {
            label && (
                <>
                    <legend
                        className={s['legend']}
                    >
                        {label}
                    </legend>
                    <label
                        htmlFor={id}
                        className={s['label']}
                    >
                        {label}
                    </label>
                </>
            )
        }
    </fieldset>
);
