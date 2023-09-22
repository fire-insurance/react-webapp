import { FocusEventHandler, KeyboardEventHandler, MutableRefObject, RefObject } from 'react';
import { BaseSelectProps } from './select';

/**
 * Объект, инкапсулирующий стейт открытия/закрытия меню опций.
 */
export type OpenStateStruct = {
    isOpen: boolean;
    openSelect: () => void;
    closeSelect: () => void;
    toggleSelect: () => void;
}

/**
 * Нативный тип коллбэка для передачи в arr.map()
 */
export type ArrayMapCallback = Parameters<typeof Array.prototype.map>[0]

export interface UseSelectReturn<ContainerNode extends HTMLElement> {
    /**
     * лейбл текущего выбранного значения
     */
    selectedValueLabel: string;
    nativeInputProps: BaseSelectProps;
    inputId: MutableRefObject<string>;
    /**
     * ref для самого внешнего контейнера селекта.
     * нужен для обработки события 'blur'.
     * Обязательно используйте tabIndex={-1} и onBlur={blurHandler} на этом же контейнере.
     */
    selectContainerRef: RefObject<ContainerNode>;
    openState: OpenStateStruct;
    optionsMapCallback: ArrayMapCallback;
    keyDownHandler: KeyboardEventHandler;
    escapeKeyHandler: KeyboardEventHandler;
    /**
     * Позволяет сбрасывать стейт isOpen при смещении фокуса за пределы компонента.
     * (работает также и на клик).
     */
    blurHandler: FocusEventHandler;
}
