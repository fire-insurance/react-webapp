// Такая конструкция позволяет делать autocomplete с вариантами выше и при этом передавать любую строку
// eslint-disable-next-line @typescript-eslint/ban-types
export type WithAutocomplete<T extends string> = T | (string & {})
