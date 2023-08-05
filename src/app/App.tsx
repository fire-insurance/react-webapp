import './styles/global.scss';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from './providers/themeProvider';
import { AppRouter } from './providers/router';

export const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <main className={clsx('app', `${theme}-theme`)}>
            <button onClick={toggleTheme}>Toggle theme</button>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>О сайте</Link>
            <AppRouter/>
        </main>
    );
};
