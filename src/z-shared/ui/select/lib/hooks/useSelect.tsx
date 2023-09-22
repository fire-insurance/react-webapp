import { FocusEventHandler, KeyboardEventHandler, useCallback, useEffect, useMemo, useRef } from 'react';
import { BaseSelectProps, SelectOptionTuple, SelectProps } from '../types/select';
import { isTupleOptions } from '../utils/isTupleOption';
import useArrowControls from './useArrowControls';
import { ArrayMapCallback, UseSelectReturn } from '../types/useSelect';
import useBooleanState from '../../../../lib/hooks/useBooleanState';
import { SelectOption, isMultiSelect, updateMultiselectState } from '../..';
import { v4 as uuid } from 'uuid';

/**
 * Управление функционалом селекта
 */
const useSelect = <
    Key extends string,
    ContainerNode extends HTMLElement
>(props: SelectProps<Key>): UseSelectReturn<ContainerNode> => {
    const {
        options, id, value, getOptionLabel, optionComponentFunction: OptionComponentFunction = SelectOption,
        closeOnOptionSelect = !props.multi, open, preventDeselect, setOpen,
    } = props;
    const [ innerOpenState, innerOpenSelect, close, toggle ] = useBooleanState(open);

    const isOpen = open ?? innerOpenState;
    const openSelect = setOpen ? () => setOpen(true) : innerOpenSelect;
    const closeSelect = setOpen ? () => setOpen(false) : close;
    const toggleSelect = setOpen ? () => setOpen(prev => !prev) : toggle;

    const selectContainerRef = useRef<ContainerNode>(null);
    const { refCallbackClosureFunction, keyDownHandler, deselectOption } = useArrowControls<Key, HTMLButtonElement>();

   /**
     * Снять выбранный элемент (в фокусе) при закрытии меню
     */
   useEffect(() => {
       !isOpen && deselectOption();
   }, [ isOpen, deselectOption ]);

   const inputId = useRef(id ?? uuid());

   const handleOptionSelect = (newValue: Key) => {
        isMultiSelect(props)
            ? props.onChange(updateMultiselectState(props.value, newValue))
            : (() => {
                // дня single option select можно настроить поведение с отменой выбора
                preventDeselect
                    ? props.onChange(newValue)
                    : props.onChange(checkIsOptionSelected(newValue) ? undefined : newValue);
            })();

        closeOnOptionSelect && closeSelect();
   };

   const checkIsOptionSelected = useCallback((optionValue: Key) =>
        Array.isArray(value)
            ? !!value.find(it => it === optionValue)
            : value === optionValue
    , [ value ]);

   /**
     * Коллбэк для передачи в options.map
     */
   const optionsMapCallback: ArrayMapCallback = useMemo(() =>
        isTupleOptions(options)
            ? ([ optionValue, label ]: SelectOptionTuple<Key>, index: number) =>
                <OptionComponentFunction
                    text={label}
                    onClick={() => handleOptionSelect(optionValue)}
                    selected={checkIsOptionSelected(optionValue)}
                    ref={refCallbackClosureFunction(optionValue, options[index - 1]?.[0], options[index + 1]?.[0])}
                    multi={props.multi}
                    key={optionValue}
                />
            : (it: Key, index: number) =>
                <OptionComponentFunction
                    text={it}
                    onClick={() => handleOptionSelect(it)}
                    selected={checkIsOptionSelected(it)}
                    ref={refCallbackClosureFunction(it, options[index - 1], options[index + 1])}
                    multi={props.multi}
                    key={it}
                />
    , [ options, value, handleOptionSelect ]);

   const selectedValueLabel: string = useMemo(() => {
       if (!props.value) return '';
       if (isMultiSelect(props)) return props.getOptionLabel(props.value) ?? '';
       return getOptionLabel ? props.getOptionLabel(props.value) ?? '' : props.value;
   }, [ getOptionLabel, props ]);

   /**
     * Закрытие меню опций при смещении фокуса за пределы компонента.
     */
   const blurHandler: FocusEventHandler = useCallback(event => {
       if (!selectContainerRef.current) return;
       const { relatedTarget } = event;

       if (!relatedTarget || !selectContainerRef.current.contains(relatedTarget)) closeSelect();
   }, []);

   /**
     * Закрытие меню опций по клику на `Escape`
     */
   const escapeKeyHandler: KeyboardEventHandler = useCallback(event => {
       event.key === 'Escape' && closeSelect();
   }, [ closeSelect ]);

   const nativeInputProps: BaseSelectProps = {
       name: props.name,
       required: props.required,
       disabled: props.disabled,
       role: props.role,
       onBlur: props.onBlur,
       id: props.id,
   };

   return {
       optionsMapCallback,
       selectedValueLabel,
       nativeInputProps,
       inputId,
       selectContainerRef,
       openState: {
           isOpen,
           openSelect,
           closeSelect,
           toggleSelect,
       },
       keyDownHandler,
       blurHandler,
       escapeKeyHandler,
   };
};

export default useSelect;
