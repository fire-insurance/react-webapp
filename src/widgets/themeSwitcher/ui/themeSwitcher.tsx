import { Theme, useTheme } from '@/app/providers/themeProvider';
import { WithClassName } from '@/z-shared/types/withClassname';
import Dark from '@/z-shared/assets/icons/moon.svg';
import Light from '@/z-shared/assets/icons/brightness.svg';
import Black from '@/z-shared/assets/icons/black-hole.svg';
import { ButtonVariant } from '@/z-shared/ui/button';
import { CollapsableButton } from '@/z-shared/ui/collapsableButton';
import { useTranslation } from 'react-i18next';

interface ThemeSwitcherProps extends WithClassName {
    collapsed: boolean;
}

export const ThemeSwitcher = ({ className, collapsed }: ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();
    const { t } = useTranslation();

    const Icon = (() => {
        switch (theme) {
            case Theme.LIGHT:
                return Light;
            case Theme.DARK:
                return Dark;
            case Theme.BLACK:
                return Black;
        }
    })();

    return (
        <CollapsableButton
            collapsed={collapsed}
            variant={ButtonVariant.GHOST}
            icon={<Icon/>}
            onClick={toggleTheme}
            text={`${t(`themeType.${theme}`)} ${t('theme').toLowerCase()}`}
            className={className}
        />
    );
};
