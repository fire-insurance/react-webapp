import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './themeContext';

interface UseThemeResult {
    theme: Theme;
    toggleTheme: () => void;
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () =>
        setTheme(prevState => {
            const newTheme = prevState === Theme.DARK ? Theme.LIGHT : Theme.DARK;
            localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);

            return newTheme;
        });

    return { theme, toggleTheme };
};
