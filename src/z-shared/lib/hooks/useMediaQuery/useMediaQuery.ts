import { useEffect, useState } from 'react';
import { createMediaQuery } from './utils/createMediaQuery';

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
