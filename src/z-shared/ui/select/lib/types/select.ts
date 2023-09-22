import { InputProps } from '../../../../ui/input';
import { ButtonProps } from '../../../../ui/button';
import { Dispatch, ForwardRefExoticComponent, HTMLProps, RefAttributes, SetStateAction } from 'react';

export type EssentialHTMLInputProps = 'name' | 'required' | 'disabled' |
'role' | 'onBlur' | 'id' | 'className';

export type BaseSelectProps = Pick<HTMLProps<HTMLInputElement>, EssentialHTMLInputProps>

type SelectOptionButtonProps = Pick<ButtonProps, 'onClick' | 'text' | 'icon' | 'iconAlignment' | 'secondaryIcon'>

export type SelectOptionProps = {
    selected?: boolean;
    multi?: boolean;
} & SelectOptionButtonProps;

/**
 * Опция в виде кортежа. Первым аргументом идет ключ опции, вторым — её label.
 */
export type SelectOptionTuple<T extends string> = [T, string];

/**
 * Использование внешнего стейта, регулирующего открытие/закрытие меню опций.
 * Потребуется при использовании пропса inputComponent.
 */
export type ControllableOpenState = {
    /**
     * При использовании обязательно передать setOpen
     */
    open: boolean;
    /**
     * При использовании обязательно передать open
     */
    setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * Использование внутреннего стейта, регулирующего открытие/закрытие меню опций.
 */
export type UncontrollableOpenState = {
    open?: never;
    setOpen?: never;
}

/**
 * Основные пропсы селекта.
 */
export type SharedSelectProps = {
    /**
     * Подпись компонента
     */
    label?: string;
    /**
     * Закрывать ли меню опций при выборе опции.
     * default: multi === true ? false : true.
     */
    closeOnOptionSelect?: boolean;
    /**
     * Компонент справа от выбранной опции. (например, иконка стрелочки)
     */
    iconComponent?: JSX.Element;
    /**
     * Переопределение функции(!) компонента опции в списке опций.
     */
    optionComponentFunction?: ForwardRefExoticComponent<SelectOptionProps & RefAttributes<HTMLButtonElement>>;
    /**
     * Кастомный компонент внутри основного контейнера селекта.
     */
    inputComponent?: JSX.Element;
    /**
     * Компонент, отображаемый при пустом массиве options
     * Полезно для имплементации SearchSelect
     */
    emptyOptionsComponent?: JSX.Element;
} & BaseSelectProps & Pick<InputProps, 'background'>
& (ControllableOpenState | UncontrollableOpenState);

/**
 * Случай, когда ключ опции и её label принимают одинаковые значения.
 * @example Ru/En/Es в селекте языка.
 */
export type UnlabeledSelectOptions<T> = {
    options: T[];
    getOptionLabel?: never;
}

/**
 * Опции в массиве options являются кортежем.
 * Поскольку value селекта имеет тип T (ключ опции)
 * требуется функция для получения label текущего value селекта
 */
export type LabeledSelectOptions<T extends string> = {
    options: SelectOptionTuple<T>[];
    getOptionLabel: (value: T) => string | undefined;
}

/**
 * Стандартный селект. Единовременно может быть выбрана только одна опция (либо ни одной).
 */
export type SingleOptionSelect<T extends string> = {
    multi?: false;
    value: T | undefined | null;
    onChange: (value: T | undefined) => void;
    /**
     * Если передать true, снятие значения будет запрещено
     */
    preventDeselect?: boolean;
} & SharedSelectProps
& (UnlabeledSelectOptions<T> | LabeledSelectOptions<T>);

/**
 * Мультиселект. Может быть выбрано любое количество опций от 0 до options.lenght
 */
export type MultipleOptionSelect<T extends string> = {
    multi: true;
    value: T[] | undefined | null;
    onChange: (value: T[] | undefined) => void;
    preventDeselect?: false;
    /**
     * Как отобразить массив выбранных опций в основном контейнере селекта
     * @example getOptionLabel(['1', '2']); // '1, 2'
     */
    getOptionLabel: (value: T[] | undefined) => string | undefined;
} & SharedSelectProps
& (Pick<UnlabeledSelectOptions<T>, 'options'> | Pick<LabeledSelectOptions<T>, 'options'>);

export type SelectProps<T extends string> = SingleOptionSelect<T> | MultipleOptionSelect<T>;
