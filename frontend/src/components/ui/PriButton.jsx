import { NavLink } from "react-router-dom";
import { useThemeContext } from "../../contexts/ThemeProvider";
function MainButton({ content, Icon }) {
  const { isDark } = useThemeContext();
  return (
    <NavLink
      to={`${content === "Discover" && ""}`}
      className={({ isActive }) =>
        `${isDark ? "dark" : ""} flex justify-start items-center  gap-2 py-1 px-2 rounded-md text-[12px] font-medium transition-colors w-41 ${
          isActive
            ? "bg-primary text-white"
            : "text-foreground  bg-background  hover:bg-hbackground "
        }`
      }
    >
      {Icon}
      {content}
    </NavLink>
  );
}

export default MainButton;
