import { ThemeContext, type Theme } from "../contexts/index";
import { useEffect, useState, useCallback, type ReactNode } from "react";

const THEME_STORAGE_KEY = "theme";
const DARK_MODE_CLASS = "dark";
const DARK_MODE_MEDIA_QUERY = "(prefers-color-scheme: dark)";

// Check whether code is running in the browser (not during SSR).
const isClient = () => typeof window !== "undefined";

// Return current OS / browser color-scheme preference. Only call on client.
const getSystemTheme = (): Theme => {
  return window.matchMedia(DARK_MODE_MEDIA_QUERY).matches ? "dark" : "light";
};

// Read a previously saved theme from localStorage, or null if none.
const getSavedTheme = (): Theme | null => {
  return localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
};

// Compute the initial theme for the app.
// Priority: SSR-safe default -> saved user preference -> system preference.
const getInitialTheme = (): Theme => {
  if (!isClient()) return "light"; // avoid referencing window during SSR

  const savedTheme = getSavedTheme();
  return savedTheme ?? getSystemTheme();
};

// Add or remove the `dark` class on the document root. This lets CSS
// (for example Tailwind's class-based dark mode) apply the correct styles.
const applyThemeToDOM = (theme: Theme): void => {
  const root = document.documentElement;
  root.classList.toggle(DARK_MODE_CLASS, theme === "dark");
};

// Persist the user's theme choice so it survives reloads.
const saveThemeToStorage = (theme: Theme): void => {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider component that manages theme state and provides theme context to child components.
 *
 * This provider handles:
 * - Initial theme detection from storage or system preferences
 * - Theme persistence to local storage
 * - Automatic theme switching based on system dark mode changes (when no saved theme exists)
 * - DOM theme class application
 * - Theme toggle functionality
 *
 * @param props - The component props
 * @param props.children - Child components that will have access to the theme context
 *
 * @returns JSX element that provides theme context to its children
 *
 * @example
 * ```tsx
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    if (!isClient()) return;

    applyThemeToDOM(theme);
    saveThemeToStorage(theme);
  }, [theme]);

  useEffect(() => {
    if (!isClient()) return;

    const mediaQuery = window.matchMedia(DARK_MODE_MEDIA_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      if (!getSavedTheme()) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
