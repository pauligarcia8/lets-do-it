import { useTheme } from "./store/theme-context";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="p-4 flex justify-end">
      <button
        onClick={toggleTheme}
        className="p-2 bg-gray-300 dark:bg-gray-700 rounded-full cursor-pointer"
      >
        {theme === "light" ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
      </button>
    </nav>
  );
}

export default Navbar;
