import { useContext, useState } from "react";
import { Context } from "./theme";

function ThemeContext({ children }) {
  const [isDark, setIsDark] = useState(false);
  return (
    <Context.Provider value={{ isDark, setIsDark }}>
      {children}
    </Context.Provider>
  );
}

const useThemeContext = () => {
  return useContext(Context);
};
export { useThemeContext };
export default ThemeContext;
