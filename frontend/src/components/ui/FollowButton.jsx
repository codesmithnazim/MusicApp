import { useThemeContext } from "../../contexts/ThemeProvider";
import { useAuth } from "../../contexts/AuthProvider";
// import {  Link, Navigate } from "react-router-dom";

function FollowButton({artist}) {
  const { isDark } = useThemeContext();
  const { user } = useAuth();
  if(user?.id===artist?.id){
    return <div className={`${isDark ? "dark" : ""} px-4 py-1 tracking-wider h-fit w-fit bg-primary rounded-sm text-sm text-white self-end-safe`}>Profile</div>
  }
  console.log('the user details from the FollowButton component = ', user )
  return (
    <button
      className={`${isDark ? "dark" : ""} px-4 py-1 tracking-wider h-fit w-fit bg-primary rounded-sm text-sm text-white self-end-safe`}
    >
      {"follow"}
    </button>
  );
}

export default FollowButton;
