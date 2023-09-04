import variablesMap from '@/app/styles/exportedVariables.module.scss';

export enum CSSVar {
    HEADER_HEIGHT = 'HEADER_HEIGHT',
    APP_TRANSITION = 'APP_TRANSITION',
}

/**
 * Возвращает переменную из exportedVariables.module.scss, обрезая
 * все нечисловые значения (px, ms и др.) и кастуя полученную строку в number
 * @param variable – имя переменной
 */

const getCssVariable = (variable: CSSVar): number => Number(variablesMap[variable].replace(/[^\d]+/, ''));

export default getCssVariable;
