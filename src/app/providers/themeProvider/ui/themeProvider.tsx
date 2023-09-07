import { FC, useMemo, useState } from 'react';
import {
    LOCAL_STORAGE_THEME_KEY, Theme,
    ThemeContext, ThemeContextProps,
} from '../lib/themeContext';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme ?? Theme.DARK;

export const ThemeProvider: FC = ({ children }) => {
    const [ theme, setTheme ] = useState<Theme>(defaultTheme);

    const memoProps: Required<ThemeContextProps> = useMemo(() => ({
        theme,
        setTheme,
    }), [ theme ]);

    return (
        <ThemeContext.Provider value={memoProps}>
            {children}
        </ThemeContext.Provider>
    );
};
