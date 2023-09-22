/**
 * Позволяет обновлять стейт выбранных опций мультиселекта.
 * Предполагает, что стейт не содержит повторений.
 * Удалит из текущего стейта строку newValue, если она уже существует (снятие выбора)
 * и добавит ее, если ее в стейте нет (выбор опции).
 * Чистая функция, не мутирует стейт(!), а возвращает новый массив.
 * @param currentState
 * @param newValue
 */
export const updateMultiselectState = <T extends string>(currentState: T[] | undefined | null, newValue: T) => {
    if (!currentState) return [ newValue ];

    const optionsSet = new Set<T>(currentState);
    optionsSet.has(newValue) ? optionsSet.delete(newValue) : optionsSet.add(newValue);
    return Array.from(optionsSet);
};
