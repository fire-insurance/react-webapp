import './styles/global.scss';
import clsx from 'clsx';
import { useTheme } from './providers/themeProvider';
import { AppRouter } from './providers/router';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';
import { Suspense } from 'react';

export const App = () => {
    const { theme } = useTheme();

    return (
        <Suspense fallback={<></>}>
            <main className={clsx('app', `${theme}-theme`)}>
                <Header/>
                <div className={'layout'}>
                    <Sidebar/>
                    <AppRouter/>
                </div>
            </main>
        </Suspense>
    );
};
