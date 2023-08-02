import { Route, Routes } from 'react-router-dom';
import './styles/global.scss';
import { Link } from 'react-router-dom';
import { AboutPageAsync } from './pages/aboutPage/aboutPage.async';
import { MainPageAsync } from './pages/mainPage/mainPage.async';
import { Suspense } from 'react';
import clsx from 'clsx';

export const App = () => (
    <main className={clsx('app', 'light-theme')}>
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
