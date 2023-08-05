import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from 'z-shared/config/routeConfig/routeConfig';

export const AppRouter = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            {
                Object.values(routeConfig).map(it => (
                    <Route
                        key={it.path}
                        {...it}
                    />
                ))
            }
        </Routes>
    </Suspense>
);
