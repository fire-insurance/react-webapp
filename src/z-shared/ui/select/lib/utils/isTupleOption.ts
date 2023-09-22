import { SelectOptionTuple } from '../types/select';

/**
 * Функция, позволяющая определить один из двух типов
 * для полученной переменной option, имеющей union-тип `SelectOption<T> | T`
 * (либо кортеж, либо строковый тип).
 * @param option
 */
export const isTupleOption = <T extends string>(
    option: SelectOptionTuple<T> | T,
): option is SelectOptionTuple<T> => Array.isArray(option);

export const isTupleOptions = <T extends string>(
    options: SelectOptionTuple<T>[] | T[],
): options is SelectOptionTuple<T>[] => isTupleOption(options[0]);
