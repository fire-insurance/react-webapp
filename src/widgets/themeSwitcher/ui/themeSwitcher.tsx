import { Theme, useTheme } from '@/app/providers/themeProvider';
import s from './themeSwitcher.module.scss';
import { WithClassName } from '@/z-shared/types/withClassname';
import clsx from 'clsx';
import Dark from '@/z-shared/assets/icons/moon.svg';
import Light from '@/z-shared/assets/icons/brightness.svg';
import Black from '@/z-shared/assets/icons/black-hole.svg';
import { Button, ButtonSize, ButtonVariant } from '@/z-shared/ui/button';

interface ThemeSwitcherProps extends WithClassName {}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();

    const [ Icon, text ] = (() => {
        switch (theme) {
            case Theme.LIGHT:
                return [ Light, 'Светлая' ];
            case Theme.DARK:
                return [ Dark, 'Темная' ];
            case Theme.BLACK:
                return [ Black, 'Чёрная' ];
        }
    })();

    return (
        <div className={clsx(s['container'], className)}>

            <Button
                variant={ButtonVariant.THIN}
                icon={<Icon/>}
                onClick={toggleTheme}
                text={text}
                size={ButtonSize.S}
            />
        </div>
    );
};
