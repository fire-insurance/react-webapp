import './styles/global.scss';
import { AppRouter } from './providers/router';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';
import { Suspense, useEffect } from 'react';

export const App = () => {

    useEffect(() => {
        throw new Error('err');
    }, []);

    return (
        <Suspense fallback={<></>}>
            <Header/>
            <div className={'layout'}>
                <Sidebar/>
                <AppRouter/>
            </div>
        </Suspense>
    );
};
