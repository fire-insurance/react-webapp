type AnimateFunctionProps = Parameters<HTMLElement['animate']>

const initialAnimationKeyframes: Keyframe[] = [
    { 'opacity': '0%', 'width': '0%' },
    { 'opacity': '10%' },
    { 'opacity': '10%', 'width': '200%' },
];

export const initialAnimationDuration = 300;
export const initialAnimationId = 'initial';

const initialAnimationProps: KeyframeAnimationOptions = {
    duration: initialAnimationDuration,
    iterations: 1,
    id: initialAnimationId,
    fill: 'forwards',
};

export const initialAnimation: AnimateFunctionProps = [ initialAnimationKeyframes, initialAnimationProps ];

const exitAnimationKeyframes: Keyframe[] = [
    { 'opacity': '5%' },
    { 'opacity': '0%' },
];

export const exitAnimationDuration = 150;
export const exitAnimationId = 'exit';

const exitAnimationProps: KeyframeAnimationOptions = {
    duration: exitAnimationDuration,
    iterations: 1,
    id: exitAnimationId,
    fill: 'forwards',
};

export const exitAnimation: AnimateFunctionProps = [ exitAnimationKeyframes, exitAnimationProps ];
