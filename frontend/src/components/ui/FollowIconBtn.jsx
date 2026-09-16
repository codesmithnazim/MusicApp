import { useEffect, useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { useAuth } from "../../contexts/AuthProvider";
import { usePlayBar } from "../../contexts/PlayerContext";
import followUserToggler from "../../services/followUserToggler";

function FollowIconBtn() {
  const [isFollowing, setIsFollowing] = useState(false);
  // const [completeUserRecord, setcompleteUserRecord] = useState("");
  const { user , setUser} = useAuth();
  const { currentSong } = usePlayBar();

  // useEffect(() => {
  //   const setUserDetails = async () => {
  //     // const { userDetails } = await usersService.getUser(user.id);
  //     // setcompleteUserRecord(userDetails);
  //     if () {
  //       return setIsFollowing(true);
  //     }
  //     // console.log("the user full detail ", userDetails);
  //     return setIsFollowing(false);
  //   };
  //   setUserDetails();
  // }, [user, isFollowing]);

 
console.log("user's details from the FollowIconBtn = ", user)


  return (
    <div className="cursor-pointer" onClick={()=>followUserToggler(currentSong, user, setUser, setIsFollowing)}>
      {user?.songs?.includes(currentSong.id) ? (
        ""
      ) : (
        <RiUserFollowLine
          className={`${user?.followings?.includes(currentSong.user) ? "text-primary" : ""} hover:text-zinc-600 `}
        />
      )}
    </div>
  );
}

export default FollowIconBtn;
