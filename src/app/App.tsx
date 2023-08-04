import { Route, Routes } from 'react-router-dom';
import './styles/global.scss';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import clsx from 'clsx';
import { useTheme } from './providers/themeProvider';
import { AboutPage } from 'pages/aboutPage';
import { MainPage } from 'pages/mainPage';

export const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <main className={clsx('app', `${theme}-theme`)}>
            <button onClick={toggleTheme}>Toggle theme</button>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>О сайте</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route
                        path={'/about'}
                        element={<AboutPage/>}
                    />
                    <Route
                        path={'/'}
                        element={<MainPage/>}
                    />
                </Routes>
            </Suspense>
        </main>
    );
};
