export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
}

export const routePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
};
