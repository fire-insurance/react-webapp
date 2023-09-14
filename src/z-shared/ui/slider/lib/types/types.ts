export type SliderMark = [value: number, label?: string];

export type SliderBoundaries = [min: number, max: number];

export interface SliderProps {
    /**
     * Текущее значение слайдера
     */
    value: number;
    /**
     * Ограничения слайдера [min, max]
     */
    boundaries?: SliderBoundaries;
    /**
     * Точки-маркеры на слайдере
     */
    marks?: number[];
    /**
     * Шаг изменения. Напр., при шаге 2 текущее значение может принимать только значения кратные 2.
     */
    step?: number;
    /**
     * Нужно ли показывать текущее значение при зажатии thumb. default: true.
     */
    showStepTooltip?: boolean;
    /**
     * Функция для получения заголовка маркера. Если не передать, в качестве заголовка будет значение маркера
     */
    getMarkLabel?: (mark: number) => string;
    /**
     * Изменить значение value
     */
    onChange: (value: number) => void;
}
