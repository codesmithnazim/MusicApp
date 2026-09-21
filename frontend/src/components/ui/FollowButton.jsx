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
        className={`${isDark ? "dark" : ""} w-21 text-center py-1 tracking-wider h-fit  bg-primary rounded-sm text-sm text-white self-end-safe`}
      >
        Profile
      </div>
    );
  }
  // console.log("the user details from the FollowButton component = ", user);
  return (
    <button
      className={`${isDark ? "dark" : ""}  w-21 text-center py-1 tracking-wider h-fit  bg-primary rounded-sm text-sm text-white self-end-safe cursor-pointer`}
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
