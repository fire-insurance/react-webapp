import { RefCallback, KeyboardEventHandler } from 'react';

/**
 * Элемент двусвязного списка с "указателями" на соседние элементы.
 */
export interface LinkedOptionListNode<Key extends string, Node extends HTMLElement> {
    node: Node;
    prevKey: Key | null;
    nextKey: Key | null;
}

/**
 * Двусвязный список опций в меню опций селекта.
 */
export type LinkedOptionList<Key extends string, Node extends HTMLElement> =
    Map<Key, LinkedOptionListNode<Key, Node>>;

export interface UseArrowControlsReturn<Key extends string, Node extends HTMLElement> {
    keyDownHandler: KeyboardEventHandler<HTMLDivElement>;

    /**
     * Функция, замыкающая в себе переданные аргументы и возвращающая RefCallback.
     * @param key ключ текущего узла
     * @param prev ключ предыдущего узла
     * @param next ключ следующего узла
     * @example
     * arr.map((it, i) => <div ref={refCallbackClosureFunction(it, arr[i - 1], arr[i + 1])}/>)
     */
    refCallbackClosureFunction: (key: Key, prev: Key | undefined, next: Key | undefined) => RefCallback<Node>;

    /**
     * Снятие выбора
     */
    deselectOption: () => void;
}

/**
 * Объект позволяющий установить только одно из полей nextKey/prevKey.
 * Используется для обновления двусвязного спика опций.
 */
export type OptionPointerObject<Key extends string, Node extends HTMLElement> =
    Pick<LinkedOptionListNode<Key, Node>, 'nextKey'> & { prevKey?: never }
    | Pick<LinkedOptionListNode<Key, Node>, 'prevKey'> & { nextKey?: never }
