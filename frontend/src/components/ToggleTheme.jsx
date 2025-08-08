import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

export function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
        color: "inherit",
      }}
      aria-label="Cambiar tema"
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
}
