import './styles/global.scss';
import { AppRouter } from './providers/router';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';
import { Suspense } from 'react';

export const App = () => (
    <Suspense fallback={<></>}>
        <Header/>
        <div className={'layout'}>
            <Sidebar/>
            <AppRouter/>
        </div>
    </Suspense>
);
