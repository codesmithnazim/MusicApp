import { useEffect } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { NavLink } from "react-router-dom";
import usersService from "../../services/users.service";

function ProfileSection() {
  const { isDark } = useThemeContext();
  useEffect(() => {
    try {
      const getProfile = async () => {
        const userExist = await usersService.getProfile();
        
      };

      getProfile();
    } catch (error) {

    }

    return () => {
      
    };
  }, []);

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
