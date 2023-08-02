import { Route, Routes } from 'react-router-dom';
import './styles/global.scss';
import { Link } from 'react-router-dom';
import { AboutPageAsync } from './pages/aboutPage/aboutPage.async';
import { MainPageAsync } from './pages/mainPage/mainPage.async';
import { Suspense } from 'react';
import clsx from 'clsx';
import { useTheme } from './theme/useTheme';

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
                        element={<AboutPageAsync/>}
                    />
                    <Route
                        path={'/'}
                        element={<MainPageAsync/>}
                    />
                </Routes>
            </Suspense>
        </main>
    );
};
