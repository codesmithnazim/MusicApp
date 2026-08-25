import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "../../contexts/ThemeContext";

function ThemeTogglingBtn() {
  const { isDark, setIsDark } = useThemeContext();
  return (
    <div className={`${isDark ? "dark" : ""} text-foreground  bg-background  hover:bg-hbackground flex justify-start items-center gap-2 py-1 px-2 pl-1 rounded-md text-[12px] font-medium transition-colors `}>
    <button
      className={`relative flex justify-center items-center  rounded-full w-8 h-5 p-1 gap-2 box-border cursor-pointer ${isDark ? "bg-indigo-800" : "bg-zinc-700"} `}
      onClick={() => {
        setIsDark(!isDark)
      }}  
    >
      <Sun
        className={`${isDark ? "opacity-30 text-yellow-500" : "opacity-100 text-yellow-400"} transition-all duration-300`}
      />
      <Moon
        className={`${isDark ? "opacity-100 text-zinc-800" : "opacity-30 text-zinc-300"} transition-all duration-300`}
      />

      <div
        className={`thumb flex justify-center items-center absolute h-3 w-3 bg-white rounded-full transition-transform duration-1000 ease-in-out  ${isDark ? "bg-zinc-800 right-1" : "bg-white left-1 "}`}
      >
        {isDark ? (
          <Moon className="text-indigo-100" size={10} />
        ) : (
          <Sun className="text-yellow-500" size={10} />
        )}
      </div >
    </button>
    {isDark? "Dark" :"Light"}
      </div>
  );
}

export default ThemeTogglingBtn;
