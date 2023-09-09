import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/themeProvider';
import { App } from '@/app/App';
import '@/z-shared/config/i18n/i18n';
import { ErrorBoundary } from './app/providers/errorBoundary';
import { PageError } from './widgets/pageError';

render(
    <BrowserRouter>
        <ThemeProvider>
            <ErrorBoundary fallback={<PageError/>}>
                <App/>
            </ErrorBoundary>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
