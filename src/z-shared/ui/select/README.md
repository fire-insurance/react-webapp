## About

Селект – весьма универсальный компонент, который может принимать различные формы (мультиселект, стандартный селект, селект с поиском по опциям и т.д.). Представленная реализация селекта – это попытка объединения различных вариаций с сохранением максимальной чистоты кода. Данный селект является [контролируемым](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components) и самостоятельно не хранит стейт текущего выбранного варианта (опции). Хранение стейта – ваша ответственность.

## Типизация

Компонент принимает пропсы с дженериком:

```typescript JSX
const SelectComponent = <T extends string>(props: SelectProps<T>, ref: ForwardedRef<HTMLInputElement>) => {
```

Данный дженерик предполагает передачу `union-типа` ключей опций селекта, например:

```typescript JSX
const optionKeys = ['option1', 'option2', 'option3'] as const;
type OptionsKeyType = typeof optionKeys[number]; // 'option1' | 'option2' | 'option3';
```

Однако, поскольку компонент обернут в `forwardRef`, это ломает использование дженерика. Если вам требуется строгая типизация для компонента – воспользуйтесь функцией `createGenericSelect`:

```typescript JSX
/**
 * Функция для создания кастомного селекта с дженериком для ключей options
 * и поддержкой forwardRef
 */
export const createGenericSelect = <T extends string>() =>
    forwardRef<HTMLInputElement, SelectProps<T>>(SelectComponent);
```

usage:

```typescript JSX
import { createGenericSelect } from '@ws-serenity/react-select';

const AppSelect = createGenericSelect<OptionsKeyType>();

const SomeComponent = () => (
    <AppSelect
        value={} // 'option1' | 'option2' | 'option3' | null | undefined;
        onChange={} // (value: 'option1' | 'option2' | 'option3' / undefined) => void;
        ...
    />
);
```

Если вы не знаете, какими будут ключи опций, или вас не волнует типизация, воспользуйтесь компонентом по умолчанию:

```typescript JSX
/**
 * Дефолтный селект, ключи options могут быть любым строковым значением
 */
export const Select = forwardRef<HTMLInputElement, SelectProps<string>>(SelectComponent);
```

usage:

```typescript JSX
import { Select } from '@ws-serenity/react-select';

const SomeComponent = () => (
    <Select
        value={} // string | null | undefined;
        onChange={} // (value: string | undefined) => void;
        ...
    />
);
```

## Базовый селект

Стандартное поведение селекта: можно выбрать только одну опцию из списка, при выборе опции меню опций закрывается (можно отключить с помощью пропса `closeOnOptionSelect={false}`). Применение дженерика ключей в примере ниже опционально!

```typescript JSX
const options: Map<OptionsKeyType, string> = new Map([
    ['option1', 'Опция 1'],
    ['option2', 'Опция 2'],
    ['option3', 'Опция 3'],
]);

const AppSelect = createGenericSelect<OptionsKeyType>();

export const SomeComponent = () => {
    const [selectedValue, setSelectedValue] = useState<OptionsKeyType>();

    const getOptionLabel = (value: OptionsKeyType) => options.get(value);

    const memoOptions = useMemo(() => Array.from(options), []);

    return (
        <AppSelect
            label={'Basic select'}
            value={selectedValue}
            onChange={setSelectedValue}
            options={memoOptions}
            getOptionLabel={getOptionLabel}
            iconComponent={<AngleDown />}
        />
    );
};

```

## Мультиселект

Мультиселект позволяет выбрать `от 0 до options.length` опций единовременно. При выборе опции меню опций **не** закрывается (можно отключить с помощью пропса `closeOnOptionSelect={true}`).

```typescript JSX
export const SomeComponent = () => {
    const [multiSelectedValue, setMultiSelectedValue] = useState<OptionsKeyType[]>();

    const getMultiOptionLabel = (value: OptionsKeyType[]) =>
        value.map(it => options.get(it))
            .join(', ');

    const memoOptions = useMemo(() => Array.from(options), []);

    return (
        <AppSelect
            multi={true} // обязательно
            label={'Multiselect'}
            value={multiSelectedValue}
            // компонент самостоятельно удалит/добавит ключ опции и вернет новый массив
            onChange={setMultiSelectedValue}
            options={memoOptions}
            getOptionLabel={getMultiOptionLabel}
            iconComponent={<AngleDown />}
            optionComponentFunction={MultiSelectOption} // переопределение компонента опции
        />
    );
};
```

## Переопределение контейнера

В некоторых случаях может потребоваться переопределение логики/ui контейнера селекта. В таком случае вы можете воспользоваться пропсом `inputComponent`. Например, в данном случае мы добавляем функционал сброса состояния `selectedValue`.

```typescript JSX
const Resettable = () => {
    const [selectedValue, setSelectedValue] = useState<OptionsKeyType>();
    // Выносим стейт, отвечающий за открытие меню
    const [isOpen, setIsOpen] = useState(false);
    const id = useId();
    const getOptionLabel = (value?: OptionsKeyType) => value ? options.get(value) : '';

    const memoOptions = useMemo(() => Array.from(options), []);

    return (
        <AppSelect
            label={'Basic select'}
            value={selectedValue}
            onChange={setSelectedValue}
            options={memoOptions}
            getOptionLabel={getOptionLabel}
            open={isOpen}
            setOpen={setIsOpen}
            id={id}
            inputComponent={(
                <SelectResetModule
                    label={getOptionLabel(selectedValue) ?? ''}
                    open={() => setIsOpen(true)}
                    showReset={!!selectedValue}
                    id={id}
                    toggle={() => setIsOpen(prev => !prev)}
                    onReset={() => setSelectedValue(undefined)}
                />
            )}
        />
    );
};
```
Реализация приведена для примера, вы вольны делать все, что придет в голову, и не будет нарушать концепции реакта :smile:
Например, ниже приведена реализация `SearchSelect`.

```typescript JSX

const searchSelectOptions = [
    'Pulp Fiction', 'Reservoir Dogs', 'The Hateful Eight', 'Kill Bill', 'Kill Bill 2', 'Jackie Brown',
];

export const SearchSelect: StoryFn<typeof Select> = () => {
    const [selectedValue, setSelectedValue] = useState<string>();
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<string[]>(searchSelectOptions);
    const id = useId();

    const handleSearch = (value: string) => setOptions(searchSelectOptions.filter(it => it.includes(value)));
    const debouncedSearchHandler = useDebounce(handleSearch, 500);

    return (
        <Select
            label={'Basic select'}
            value={selectedValue}
            onChange={setSelectedValue}
            options={options}
            open={isOpen}
            setOpen={setIsOpen}
            id={id}
            // вы также можете задать компонент, который будет показан, в случае, если options.length === 0
            emptyOptionsComponent={(
                <div className={'search-select-empty'}>Ничего не найдено</div>
            )}
            inputComponent={(
                <SelectSearchModule
                    isOpen={isOpen}
                    onSearch={debouncedSearchHandler}
                    label={selectedValue ?? ''}
                    open={() => setIsOpen(true)}
                    showReset={!!selectedValue}
                    id={id}
                    toggle={() => setIsOpen(prev => !prev)}
                    onReset={() => setSelectedValue(undefined)}
                />
            )}
        />
    );
};
```

## Интеграция c `react-hook-form`

Так как компонент селекта является контролируемым, интеграция осуществляется через [Controller](https://react-hook-form.com/api/usecontroller/controller/).

## Управление с клавиатуры

Селект поддерживает управление с помощью `Tab` и клавиш `ArrowUp`/`W`/`D` (для выбора следующей опции) `ArrowDown`/`S`/`A` (для выбора предыдущей опции). Опции выбираются при помощи `Enter`, закрыть меню опций можно по клику на `Escape`.

## I want more

Не хватило функционала? Хотите сделать виртуализацию списка опций через `InterstectionObserver` в контейнере списка опций? Нужно существенно усложнить `SearchSelect` и не хочется передавать пропс `inputComponent`? Воспользуйтесь хуком `useSelect`, инкапсулирующим в себе основной функционал селекта.
