import { AboutPage } from '@/pages/aboutPage';
import { MainPage } from '@/pages/mainPage';
import { RouteProps } from 'react-router-dom';
import { AppRoutes, routePath } from '@/z-shared/config/routeConfig';
import { NotFound404 } from '@/pages/404';

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: routePath[AppRoutes.MAIN],
        element: <MainPage/>,
    },
    [AppRoutes.ABOUT]: {
        path: routePath[AppRoutes.ABOUT],
        element: <AboutPage/>,
    },
    [AppRoutes.NOT_FOUND]: {
        path: routePath[AppRoutes.NOT_FOUND],
        element: <NotFound404/>,
    },
};
