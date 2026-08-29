import { useContext, useEffect, useState } from "react";
import { themeContext } from "./themeContext";

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("theme"))
      ? JSON.parse(localStorage.getItem("theme"))
      : false,
  );
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDark));
    console.log("current theme ", isDark);
  }, [isDark]);
  return (
    <themeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </themeContext.Provider>
  );
}

const useThemeContext = () => {
  return useContext(themeContext);
};
export default ThemeProvider;
export { useThemeContext };
