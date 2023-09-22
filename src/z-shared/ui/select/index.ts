export { createGenericSelect } from './ui/select/select';

//hooks
export { default as useSelect } from './lib/hooks/useSelect';

// components
export { SelectOption } from './ui/selectOption/selectOption';
export { Select } from './ui/select/select';

//types
export type {
    EssentialHTMLInputProps,
    BaseSelectProps,
    SelectOptionProps,
    SelectOptionTuple,
    ControllableOpenState,
    UncontrollableOpenState,
    SharedSelectProps,
    UnlabeledSelectOptions,
    LabeledSelectOptions,
    SingleOptionSelect,
    MultipleOptionSelect,
    SelectProps,
} from './lib/types/select';

export type {
    OpenStateStruct,
    ArrayMapCallback,
    UseSelectReturn,
} from './lib/types/useSelect';

//utils
export { isMultiSelect } from './lib/utils/isMultiSelect';
export { isTupleOption, isTupleOptions } from './lib/utils/isTupleOption';
export { updateMultiselectState } from './lib/utils/updateMultiselectState';
