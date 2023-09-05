import s from './button.module.scss';
import clsx from 'clsx';
import { BaseButtonProps, ButtonSize, ButtonVariant } from './types/buttonTypes';
import { ParagraphSkeleton, Skeleton, SkeletonVariant } from '../skeleton';
import { AppTypography } from '@/z-shared/types/appTypography';
import { IconWrapper } from './ui/iconWrapper';

type BooleanSkeletonButtonProps = 'icon' | 'text' | 'secondaryIcon';
type ButtonSkeletonProps = Omit<BaseButtonProps, BooleanSkeletonButtonProps | 'showLoader' | 'theme'>
& Partial<Record<keyof Pick<BaseButtonProps, BooleanSkeletonButtonProps>, boolean>>

export const ButtonSkeleton = (props: ButtonSkeletonProps) => {
    const {
        variant = ButtonVariant.PRIMARY, size = ButtonSize.L, iconAlignment = 'left',
        icon, secondaryIcon, fillContainer, text,
    } = props;

    return (
        <Skeleton
            className={clsx(
                s['skeleton'],
                s['button'],
                s[`skeleton_variant--${variant}`],
                s[`button_size--${size}`],
                {
                    [s['button--square']]: icon && !text && !secondaryIcon,
                    [s['button--fill']]: fillContainer,
                },
            )}
        >
            <IconWrapper
                createWrapper={!!icon && !!text}
                iconAlignment={iconAlignment}
            >
                {
                    icon && (
                        <Skeleton
                            className={s['icon-skeleton']}
                            variant={SkeletonVariant.SQUARE}
                            composite={true}
                        />
                    )
                }
                {
                    text && (
                        <ParagraphSkeleton
                            className={clsx(
                                size === ButtonSize.L ? AppTypography.BTN_LABEL : AppTypography.BTN_LABEL_MINI,
                                s['skeleton-text'],
                            )}
                            lastLineWidth={'100'}
                            composite={true}
                        />
                    )
                }
            </IconWrapper>
            {
                secondaryIcon && (
                    <Skeleton
                        className={s['icon-skeleton']}
                        variant={SkeletonVariant.SQUARE}
                        composite={true}
                    />
                )
            }
        </Skeleton>
    );
};
