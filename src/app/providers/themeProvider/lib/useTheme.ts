import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './themeContext';

interface UseThemeResult {
    theme: Theme;
    toggleTheme: () => void;
}

const iterateOverTheme = (currentTheme: Theme): Theme => {
    const newTheme = (() => {
        switch (currentTheme) {
            case Theme.LIGHT:
                return Theme.DARK;
            case Theme.DARK:
                return Theme.BLACK;
            case Theme.BLACK:
                return Theme.LIGHT;
        }
    })();

    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);

    return newTheme;
};

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => setTheme(prevState => iterateOverTheme(prevState));

    return { theme, toggleTheme };
};
