import { useAuth } from "../../contexts/AuthProvider";
import { useThemeContext } from "../../contexts/ThemeProvider";
import { NavLink } from "react-router-dom";

function ProfileSection() {
  const { isDark } = useThemeContext();
  const { isAuthenticated, user } = useAuth();

  console.log(
    "the data from the profile section ",
    isAuthenticated,
    "the user details = ",
    user,
  );
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

export default ProfileSection;
