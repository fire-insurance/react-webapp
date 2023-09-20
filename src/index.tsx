import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/themeProvider';
import { App } from '@/app/App';
import '@/z-shared/config/i18n/i18n';
import { ErrorBoundary } from './app/providers/errorBoundary';
import { PageError } from './widgets/pageError';
import { ModalProvider } from './z-shared/providers/modalProvider';
import { ActiveModal } from './z-shared/providers/modalProvider/ui/activeModal';

render(
    <BrowserRouter>
        <ThemeProvider>
            <ErrorBoundary fallback={<PageError/>}>
                <ModalProvider>
                    <App/>
                    <ActiveModal/>
                </ModalProvider>
            </ErrorBoundary>
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root'),
);
