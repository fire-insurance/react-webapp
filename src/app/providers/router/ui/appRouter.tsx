import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from '../model/const/routeConfig';

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
