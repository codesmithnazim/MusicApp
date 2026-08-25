import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "../../contexts/ThemeContext";

function ThemeTogglingBtn() {
  const { isDark, setIsDark } = useThemeContext();
  return (
    <button
      className={`relative flex justify-center items-center  rounded-full w-14 h-8 p-1 gap-2 box-border cursor-pointer ${isDark ? "bg-indigo-800" : "bg-zinc-700"} `}
      onClick={() => {
        setIsDark(!isDark)
      }}
    >
      <Sun
        className={`${isDark ? "opacity-30 text-yellow-200" : "opacity-100 text-yellow-500"} transition-all duration-300`}
      />
      <Moon
        className={`${isDark ? "opacity-100 text-zinc-950" : "opacity-30 text-zinc-400"} transition-all duration-300`}
      />

      <div
        className={`thumb flex justify-center items-center absolute h-6 w-6 bg-white rounded-full transition-transform duration-1000 ease-in-out  ${isDark ? "bg-zinc-800 right-1" : "bg-white left-1 "}`}
      >
        {isDark ? (
          <Moon className="text-indigo-100" size={15} />
        ) : (
          <Sun className="text-yellow-500" size={15} />
        )}
      </div>
    </button>
  );
}

export default ThemeTogglingBtn;
