import { useMemo } from "react";
import { useTheme } from "../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const { icon, label } = useMemo(
    () => ({
      icon: theme === "dark" ? faSun : faMoon,
      label: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
    }),
    [theme]
  );

  return (
    <button
      onClick={toggleTheme}
      aria-label={label}
      className={`relative flex items-center justify-center overflow-hidden cursor-pointer rounded-md aspect-square p-1 transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-gray-800 dark:hover:shadow-gray-950
      `}
    >
      <FontAwesomeIcon icon={icon} className="relative z-10" />
    </button>
  );
};

export default ThemeToggle;
