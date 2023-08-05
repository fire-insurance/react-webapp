import './styles/global.scss';
import clsx from 'clsx';
import { useTheme } from './providers/themeProvider';
import { AppRouter } from './providers/router';
import { Header } from 'widgets/header';

export const App = () => {
    const { theme } = useTheme();

    return (
        <main className={clsx('app', `${theme}-theme`)}>
            <Header/>
            <AppRouter/>
        </main>
    );
};
