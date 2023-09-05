import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from '../model/const/routeConfig';
import { Loader } from '@/z-shared/ui/loader/loader';

export const AppRouter = () => (
    <Routes>
        {
            Object.values(routeConfig).map(({ element, path }) => (
                <Route
                    key={path}
                    path={path}
                    element={(
                        <div className={'page-wrapper'}>
                            <Suspense fallback={(
                                <div className={'suspense-wrapper'}>
                                    <Loader/>
                                </div>
                                )}
                            >
                                {element}
                            </Suspense>
                        </div>
                    )}
                />
            ))
        }
    </Routes>
);
