import { useState, useEffect } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button
      type="button"
      onClick={handleThemeSwitch}
      className="flex ml-auto text-neutral-900 dark:text-white text-lg p-1.5 rounded-lg hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10 transition-all duration-500"
    >
      {theme === "dark" ? (
        <MdOutlineLightMode className="w-4 h-4" />
      ) : (
        <MdOutlineDarkMode className="w-4 h-4" />
      )}
    </button>
  );
};

export default ThemeSwitch;
