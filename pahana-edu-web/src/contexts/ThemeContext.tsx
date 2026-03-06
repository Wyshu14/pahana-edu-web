import { createContext } from "react";

export type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

/**
 * React context for managing theme-related state and functionality.
 *
 * This context provides access to theme configuration, theme switching capabilities,
 * and other theme-related utilities throughout the application component tree.
 *
 * @example
 * ```tsx
 * const theme = useContext(ThemeContext);
 * if (!theme) {
 *   throw new Error('ThemeContext must be used within a ThemeProvider');
 * }
 * ```
 *
 * @see {@link ThemeContextType} for the shape of the context value
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
