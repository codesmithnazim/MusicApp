import { useEffect, useState } from "react";
import { RiUserFollowLine } from "react-icons/ri";
import { useAuth } from "../../contexts/AuthProvider";
import { usePlayBar } from "../../contexts/PlayerContext";
import usersService from "../../services/users.service";
import followUserToggler from "../../services/followUserToggler";

function FollowIconBtn() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [completeUserRecord, setcompleteUserRecord] = useState("");
  const { user } = useAuth();
  const { currentSong } = usePlayBar();

  useEffect(() => {
    const setUserDetails = async () => {
      const { userDetails } = await usersService.getUser(user.id);
      setcompleteUserRecord(userDetails);
      if (userDetails.followings.includes(currentSong.user)) {
        return setIsFollowing(true);
      }
      console.log("the user full detail ", userDetails);
      return setIsFollowing(false);
    };
    setUserDetails();
  }, [user, isFollowing]);

 

  return (
    <div className="cursor-pointer" onClick={()=>followUserToggler(currentSong, completeUserRecord, setcompleteUserRecord, setIsFollowing)}>
      {completeUserRecord?.songs?.includes(currentSong.id) ? (
        ""
      ) : (
        <RiUserFollowLine
          className={`${isFollowing ? "text-primary" : ""} hover:text-zinc-600 `}
        />
      )}
    </div>
  );
}

export default FollowIconBtn;
