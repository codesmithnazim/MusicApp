import { useContext, useEffect, useState } from "react";
import { Context } from "./theme";

function ThemeContext({ children }) {
  // const [isDark, setIsDark] = useState(
  //   localStorage.getItem("theme") !== "undefined" &&
  //     localStorage.getItem("theme") !== "false" &&
  //     localStorage.getItem("theme")
  //     ? localStorage.getItem("theme")
  //     : false,
  // );
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("theme"))
      ? JSON.parse(localStorage.getItem("theme"))
      : false,
  );
  useEffect(() => {
    // const themeColor =
    //   localStorage.getItem("theme") !== "undefined" &&
    //   localStorage.getItem("theme")
    //     ? localStorage.getItem("theme")
    //     : false;
    // setIsDark(themeColor);
    localStorage.setItem("theme", JSON.stringify(isDark));
    console.log("current theme ", isDark);
  }, [isDark]);
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
