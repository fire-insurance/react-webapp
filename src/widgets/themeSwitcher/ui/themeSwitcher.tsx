import { useTheme } from '@/app/providers/themeProvider';
import s from './themeSwitcher.module.scss';
import { WithClassName } from '@/z-shared/types/withClassname';
import clsx from 'clsx';

interface ThemeSwitcherProps extends WithClassName {}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { toggleTheme } = useTheme();

    return (
        <div className={clsx(s['container'], className)}>
            <button onClick={toggleTheme}>Переключить тему</button>
        </div>
    );
};
