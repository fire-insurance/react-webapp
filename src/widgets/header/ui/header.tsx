import { useTheme } from 'app/providers/themeProvider';
import s from './header.module.scss';
import { Link } from 'react-router-dom';
import { AppRoutes } from 'z-shared/config/routeConfig';
import { WithClassName } from 'z-shared/types/withClassname';
import clsx from 'clsx';

interface HeaderProps extends WithClassName {}

export const Header = ({ className }: HeaderProps) => {
    const { toggleTheme } = useTheme();

    return (
        <header className={clsx(s['container'], className)}>
            <div>Приложение</div>
            <nav className={s['nav']}>
                <button onClick={toggleTheme}>Переключить тему</button>
                <Link to={AppRoutes.MAIN}>Главная</Link>
                <Link to={AppRoutes.ABOUT}>О сайте</Link>
            </nav>
        </header>
    );
};
