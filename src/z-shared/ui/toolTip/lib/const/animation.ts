import { AnimateFunctionProps } from '../../../../types/animateFunctionProps';

const fadeInAnimationKeyframes: Keyframe[] = [
    { 'opacity': '0%' },
    { 'opacity': '100%' },
];

export const initialAnimationDuration = 350;
export const fadeInAnimationId = 'fadeIn';

const fadeInAnimationProps: KeyframeAnimationOptions = {
    duration: initialAnimationDuration,
    iterations: 1,
    id: fadeInAnimationId,
    fill: 'forwards',
};

export const fadeInAnimation: AnimateFunctionProps = [ fadeInAnimationKeyframes, fadeInAnimationProps ];
