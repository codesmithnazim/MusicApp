import { useThemeContext } from "../../contexts/ThemeProvider";
import { useAuth } from "../../contexts/AuthProvider";
import followUserToggler from "../../services/followUserToggler";
// import {  Link, Navigate } from "react-router-dom";

function FollowButton({artist}) {
  const { isDark } = useThemeContext();
  const { user , setUser} = useAuth();
  if(user?.id===artist?.id){
    return <div className={`${isDark ? "dark" : ""} w-21 text-center py-1 tracking-wider h-fit  bg-primary rounded-sm text-sm text-white self-end-safe`}>Profile</div>
  }
  console.log('the user details from the FollowButton component = ', user )
  return (
    <button
      className={`${isDark ? "dark" : ""}  w-21 text-center py-1 tracking-wider h-fit  bg-primary rounded-sm text-sm text-white self-end-safe cursor-pointer`}
      onClick={(e)=>{e.stopPropagation(); e.preventDefault();followUserToggler(artist.id, user, setUser)}}
    >
      {user?.followings?.includes(artist.id) ? "unfollow":"follow"}
    </button>
  );
}

export default FollowButton;
