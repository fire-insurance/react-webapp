import { Theme, useTheme } from '@/app/providers/themeProvider';
import { WithClassName } from '@/z-shared/types/withClassname';
import Dark from '@/z-shared/assets/icons/moon.svg';
import Light from '@/z-shared/assets/icons/brightness.svg';
import Black from '@/z-shared/assets/icons/black-hole.svg';
import { Button, ButtonVariant } from '@/z-shared/ui/button';

interface ThemeSwitcherProps extends WithClassName {
    collapsed: boolean;
}

export const ThemeSwitcher = ({ className, collapsed }: ThemeSwitcherProps) => {
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
        <Button
            variant={ButtonVariant.GHOST}
            icon={<Icon/>}
            onClick={toggleTheme}
            text={collapsed ? undefined : text}
            className={className}
        />
    );
};
