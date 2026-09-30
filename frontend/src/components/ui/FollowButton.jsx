import { useThemeContext } from "../../contexts/ThemeProvider";
import { useAuth } from "../../contexts/AuthProvider";
import followUserToggler from "../../services/followUserToggler";
import {  useNavigate } from "react-router-dom";
import { memo } from "react";
// import {  Link, Navigate } from "react-router-dom";

function FollowButton({ artist }) {
  const { isDark } = useThemeContext();
  const { user, setUser, isAuthenticated } = useAuth();
const navigate= useNavigate()
  if (user?.id === artist?.id) {
    return (
      <div
        className={`${isDark ? "dark" : ""} w-15 text-center px-1 py-0.5 tracking-wider h-fit  bg-primary rounded-sm  text-white  text-xs self-center`}
      >
        Profile
      </div>
    );
  }
  // console.log("the user details from the FollowButton component = ", user);
  return (
    <button
      className={`${isDark ? "dark" : ""}  w-16 text-center px-1 py-0.5 tracking-wider h-fit  bg-primary rounded-sm text-xs text-white  cursor-pointer self-center`}
      onClick={(e) => {
        if(!isAuthenticated) {
          return navigate("/login")
        }
        e.stopPropagation();
        e.preventDefault();
        followUserToggler(artist.id, user, setUser);
      }}
    >
      {user?.followings?.includes(artist?.id) ? "following" : "follow"}
    </button>
  );
}

export default memo(FollowButton);
