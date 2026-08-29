import { NavLink } from "react-router-dom";
import { useThemeContext } from "../../contexts/ThemeProvider";
function AuthenticatingButtons() {
  const { isDark } = useThemeContext();

  return (
    <div className="flex gap-2">
      <NavLink
        to={"login"}
        className={`${isDark ? "dark" : ""}  w-fit py-1 px-2 rounded-sm `}
      >
        Login
      </NavLink>
      <NavLink
        to={"register"}
        className={`${isDark ? "dark" : ""} text-white flex items-center w-fit bg-primary  px-2 rounded-sm`}
      >
        Sign up
      </NavLink>
    </div>
  );
}

export default AuthenticatingButtons;
