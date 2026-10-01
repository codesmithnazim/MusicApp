import { useAuth } from "../../contexts/AuthProvider";
import followUserToggler from "../../services/followUserToggler";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
// import {  Link, Navigate } from "react-router-dom";

function FollowButton({ artist }) {
  const { user, setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (user?.id === artist?.id) {
    return (
      <div
        className={` w-15  text-center py-0.5 tracking-wider h-fit  bg-primary rounded-sm  text-white  text-xs font-medium  cursor-pointer self-center lg:w-19 lg:py-1  lg:px-2 2xl:text-sm`}
      >
        Profile
      </div>
    );
  }
  // console.log("the user details from the FollowButton component = ", user);
  return (
    <button
      className={` w-15  text-center py-0.5 tracking-wider h-fit  bg-primary rounded-sm  text-white  text-xs font-medium cursor-pointer self-center lg:w-19 lg:py-1  lg:px-2  2xl:text-sm`}
      onClick={(e) => {
        if (!isAuthenticated) {
          return navigate("/login");
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
