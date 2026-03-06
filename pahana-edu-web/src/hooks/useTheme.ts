import { useContext } from "react";
import { ThemeContext } from "../contexts";

/**
 * Hook to access the current theme context.
 *
 * @returns The theme context value containing theme state and methods
 * @throws {Error} When used outside of a ThemeProvider component
 *
 * @example
 * ```tsx
 * const { theme, toggleTheme } = useTheme();
 * ```
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
