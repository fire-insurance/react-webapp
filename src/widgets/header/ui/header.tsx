import { useTheme } from 'app/providers/themeProvider';
import s from './header.module.scss';
import { AppRoutes } from 'z-shared/config/routeConfig';
import { WithClassName } from 'z-shared/types/withClassname';
import clsx from 'clsx';
import { AppLink } from 'z-shared/ui/appLink';

interface HeaderProps extends WithClassName {}

export const Header = ({ className }: HeaderProps) => {
    const { toggleTheme } = useTheme();

    return (
        <header className={clsx(s['container'], className)}>
            <div>Приложение</div>
            <nav className={s['nav']}>
                <button onClick={toggleTheme}>Переключить тему</button>
                <AppLink to={AppRoutes.MAIN}>Главная</AppLink>
                <AppLink to={AppRoutes.ABOUT}>О сайте</AppLink>
            </nav>
        </header>
    );
};
