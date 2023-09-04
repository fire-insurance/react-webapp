import { Button, ButtonVariant } from '@/z-shared/ui/button';
import Test from '@/z-shared/assets/icons/uil_fire.svg';
import { AccentColors } from '@/z-shared/types/appColors';
import s from './mainPage.module.scss';
import { useState } from 'react';
import { Skeleton } from '@/z-shared/ui/skeleton/skeleton';
import { ParagraphSkeleton } from '@/z-shared/ui/skeleton';
import { AppTypography } from '@/z-shared/types/appTypography';

const MainPage = () => {
    const [ loading, setLoading ] = useState(false);
    const toggle = () => setLoading(prev => !prev);

    const loadSmth = () => {
        setLoading(true);
        setTimeout(() => toggle(), 3000);
    };

    return (
        <div className={s['container']}>
            <div className={s['row']}>
                <Skeleton className={s['skeleton']}/>
                <ParagraphSkeleton
                    className={AppTypography.BTN_LABEL}
                    lineQuantity={4}
                />
                <Button
                    variant={ButtonVariant.PRIMARY}
                    text={'button'}
                    icon={<Test/>}
                    secondaryIcon={<Test/>}
                    showLoader={loading}
                    onClick={loadSmth}
                />
                <Button
                    variant={ButtonVariant.PRIMARY}
                    theme={AccentColors.GREEN}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.PRIMARY}
                    theme={AccentColors.RED}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.PRIMARY}
                    theme={AccentColors.BLUE}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.PRIMARY}
                    theme={AccentColors.ORANGE}
                    text={'button'}
                    icon={<Test/>}
                />
            </div>
            <div className={s['row']}>
                <Button
                    variant={ButtonVariant.SECONDARY}
                    text={'button'}
                    icon={<Test/>}
                    secondaryIcon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.SECONDARY}
                    theme={AccentColors.GREEN}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.SECONDARY}
                    theme={AccentColors.RED}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.SECONDARY}
                    theme={AccentColors.BLUE}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.SECONDARY}
                    theme={AccentColors.ORANGE}
                    text={'button'}
                    icon={<Test/>}
                />
            </div>
            <div className={s['row']}>
                <Button
                    variant={ButtonVariant.FLAT}
                    text={'button'}
                    icon={<Test/>}
                    secondaryIcon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.FLAT}
                    theme={AccentColors.GREEN}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.FLAT}
                    theme={AccentColors.RED}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.FLAT}
                    theme={AccentColors.BLUE}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.FLAT}
                    theme={AccentColors.ORANGE}
                    text={'button'}
                    icon={<Test/>}
                />
            </div>
            <div className={s['row']}>
                <Button
                    variant={ButtonVariant.THIN}
                    text={'button'}
                    icon={<Test/>}
                    secondaryIcon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.THIN}
                    theme={AccentColors.GREEN}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.THIN}
                    theme={AccentColors.RED}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.THIN}
                    theme={AccentColors.BLUE}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.THIN}
                    theme={AccentColors.ORANGE}
                    text={'button'}
                    icon={<Test/>}
                />
            </div>
            <div className={s['row']}>
                <Button
                    variant={ButtonVariant.GHOST}
                    text={'button'}
                    icon={<Test/>}
                    secondaryIcon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.GHOST}
                    theme={AccentColors.GREEN}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.GHOST}
                    theme={AccentColors.RED}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.GHOST}
                    theme={AccentColors.BLUE}
                    text={'button'}
                    icon={<Test/>}
                />
                <Button
                    variant={ButtonVariant.GHOST}
                    theme={AccentColors.ORANGE}
                    text={'button'}
                    icon={<Test/>}
                />
            </div>
        </div>
    );
};

export default MainPage;
