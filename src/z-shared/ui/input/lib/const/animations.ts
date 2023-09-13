export interface LabelAnimationKeyframe {
    left: number;
    top: number;
}

export const initialAnimationDuration = 150;
export const labelAnimationId = 'labelAnimation';

export const labelAnimationOptions: KeyframeAnimationOptions = {
    duration: initialAnimationDuration,
    iterations: 1,
    id: labelAnimationId,
    fill: 'both',
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
};

export const createLabelAnimationKeyframes = (from: LabelAnimationKeyframe, to: LabelAnimationKeyframe): Keyframe[] => [
    { left: `calc(${from.left}px + 0.5ch - 1px)`, top: `${from.top}px` },
    { left: `${to.left}px`, top: `${to.top}px` },
];

export const legendAnimationKeyframes: Keyframe[] = [
    { width: 'fit-content', padding: '0 0.5ch' },
    { width: '0', padding: '0' },
];
