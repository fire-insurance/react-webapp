import { useMemo, useState } from 'react';

type BooleanStateHandler = () => void;

type UseBooleanStateReturn = [
    state: boolean,
    setToTrue: BooleanStateHandler,
    setToFalse: BooleanStateHandler,
    toggle: BooleanStateHandler
];

/**
 * Сахарная обертка над `React.useState` для инкапсуляции часто используемых операций
 * с boolean-состоянием (установка в true/false и переключение состояния).
 * @param initialState первичное состояние. Будет установлено в false, если его не передать.
 * @returns кортеж с переменной состояния и функциями для его изменения.
 * Не возвращает `React.Dispatch<SetStateAction<boolean>>`!
 * @example
 * ```typescript JSX
 * // использование всех переменных
 * const [ isOpen, openSelect, closeSelect, toggleSelect ] = useBooleanState(false);
 * // использование только состояния и функции его переключения
 * const [ state, , , toggleState ] = useBooleanState(false);
 * ```
 */
const useBooleanState = (initialState = false): UseBooleanStateReturn => {
    const [ booleanState, setBooleanState ] = useState(initialState);
    const setToTrue = () => setBooleanState(true);
    const setToFalse = () => setBooleanState(false);
    const toggle = () => setBooleanState(prev => !prev);

    return useMemo(() => [ booleanState, setToTrue, setToFalse, toggle ], [ booleanState ]);
};

export default useBooleanState;
