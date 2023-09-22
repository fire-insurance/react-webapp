import { MultipleOptionSelect, SelectProps } from '../types/select';

/**
 * Позволяет строго определить, является ли селект мультиселектом
 * по переданным ему пропсам.
 * @param selectProps
 */
export const isMultiSelect = <T extends string>(
    selectProps: SelectProps<T>,
): selectProps is MultipleOptionSelect<T> => !!selectProps.multi;
