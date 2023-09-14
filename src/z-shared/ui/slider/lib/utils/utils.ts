import { SliderBoundaries } from '../types/types';

export const createPercentToStepFn = ([ min, max ]: SliderBoundaries, step: number) => {
    const stepCount = 1 + max - min;

    return (percent: number) => {
        const percentageMovedToStep = percent / 100 * stepCount;
        const roundedByStep = Math.round(percentageMovedToStep / step) * step;
        return Math.max(min, Math.min(max, roundedByStep));
    };
};

export const stepToPercent = (step: number, max: number) => Math.floor(step / max * 100);
