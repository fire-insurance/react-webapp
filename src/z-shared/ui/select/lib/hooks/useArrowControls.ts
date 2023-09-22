import { KeyboardEventHandler, useRef } from 'react';
import { OptionPointerObject, LinkedOptionList, LinkedOptionListNode, UseArrowControlsReturn } from '../types/useArrowControl';
import { handleKeyDown } from '../utils/handleKeyDown';

/**
 * Управление наведением фокуса на опции в меню опций с помощью стрелочек клавиатуры (вверх/вниз)
 * @generic Key тип ключей опций.
 * @generic Node тип контейнера опций.
 */
const useArrowControls = <
    Key extends string,
    Node extends HTMLElement
>(): UseArrowControlsReturn<Key, Node> => {

    const linkedOptionListRef = useRef<LinkedOptionList<Key, Node>>(new Map([]));
    const selectedOption = useRef<LinkedOptionListNode<Key, Node> | null>(null);

    /**
     * Удаление опции из двусвязного списка по ее ключу.
     * Обновляет указатели nextKey и prevKey для предыдущей и следующей опции в списке соответственно
     */
    const deleteOption = (key: Key) => {
        const option = linkedOptionListRef.current.get(key);
        if (!option) return;

        const { prevKey, nextKey } = option;
        updateOption(nextKey, { prevKey: prevKey });
        updateOption(prevKey, { nextKey: nextKey });
        linkedOptionListRef.current.delete(key);
    };

    /**
     * Обновление поля nextKey/prevKey (только одного) в объекте списка по ключу key.
     * @param key ключ объекта в котором будет обновлено поле
     * @param updatedPointer поле для обновления: { nextKey: value } || { prevKey: value }
     */
    const updateOption = (key: Key | null, updatedPointer: OptionPointerObject<Key, Node>) => {
        const optionToUpdate = key ? linkedOptionListRef.current.get(key) : null;
        if (!optionToUpdate || !key) return;
        linkedOptionListRef.current.set(key, { ...optionToUpdate, ...updatedPointer });
    };

    /**
     * Создание коллбэка для слушателя события 'focus' с замыканием узла двусвязного списка.
     * @param node
     */
    const nodeFocusListenerCallbackCreator = (node: LinkedOptionListNode<Key, Node> | null) =>
        () => selectedOption.current = node;

    /**
     * Возвращает refCallback, который позволяет заполнить двусвязный список опций
     * в options.map().
     * Также навешивает слушатель события 'focus' на каждый узел в меню опций
     * для синхронизации selectedOption при управлении с помощью Tab и стрелок.
     * React передает в Refcallback DOM-узел при монтировании и null при демонтировании узла.
     */
    const refCallbackClosureFunction = (key: Key, prev: Key | undefined, next: Key | undefined) =>
        (node: Node | null) => {
            const listNode: LinkedOptionListNode<Key, Node> | null = node
                ? { node: node, prevKey: prev ?? null, nextKey: next ?? null }
                : null;
            const nodeFocusListenerCallback = nodeFocusListenerCallbackCreator(listNode);
            if (node && listNode) {
                node.addEventListener('focus', nodeFocusListenerCallback);
                linkedOptionListRef.current.set(key, listNode);
            } else {
                linkedOptionListRef.current.get(key)?.node.removeEventListener('focus', nodeFocusListenerCallback);
                deleteOption(key);
            }
        };

    const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = event => {
        const pointerToSelect = handleKeyDown(event.code);
        if (!pointerToSelect) return;

        // никакой узел еще не находится в фокусе. Выбрать первый доступный.
        if (!selectedOption.current) {
            const firstOptionKey = Array.from(linkedOptionListRef.current)[0][0];
            selectedOption.current = linkedOptionListRef.current.get(firstOptionKey) ?? null;
            selectedOption.current?.node.focus();
            return;
        }

        // получаем ключ следующей выбираемой опции, достаем ее из двусвязного списка,
        // вызываем ей .focus() и записываем в selectedOption
        const optionToSelectKey = selectedOption.current[pointerToSelect];
        if (!optionToSelectKey) return;
        const nextOption = linkedOptionListRef.current.get(optionToSelectKey);
        if (nextOption) {
            nextOption.node.focus();
            selectedOption.current = nextOption;
        }
    };

    /**
     * Снятие текущего выбора.
     */
    const deselectOption = () => selectedOption.current = null;

    return {
        keyDownHandler,
        refCallbackClosureFunction,
        deselectOption,
    };
};

export default useArrowControls;
