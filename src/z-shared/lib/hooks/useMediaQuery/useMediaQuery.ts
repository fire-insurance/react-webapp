import { useEffect, useState } from 'react';
import { createMediaQuery } from './utils/createMediaQuery';

/**
 * Навешивает слушатель события на window.matchMedia
 * и возвращает стейт matches для переданного mediaQuery
 * @param query
 */
export const useMediaQuery = (query: string) => {
    const [ matches, setMatches ] = useState(false);

    useEffect(() => {
        const mediaQuery = createMediaQuery(query);
        setMatches(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => setMatches(e.matches);

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return matches;
};
