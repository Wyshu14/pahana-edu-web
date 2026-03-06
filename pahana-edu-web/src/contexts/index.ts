/**
 * @fileoverview Central export module for application contexts.
 *
 * This module serves as a barrel export for all context providers used throughout
 * the application, providing a single import location for context consumers.
 *
 * @example
 * ```typescript
 * import { ThemeContext } from './contexts';
 * ```
 */
export { ThemeContext } from "./ThemeContext";
export type { Theme } from "./ThemeContext";
