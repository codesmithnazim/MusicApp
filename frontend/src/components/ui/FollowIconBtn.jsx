import { RiUserFollowLine } from "react-icons/ri";
import { useAuth } from "../../contexts/AuthProvider";
import { usePlayBar } from "../../contexts/PlayerContext";
import followUserToggler from "../../services/followUserToggler";
import { useNavigate } from "react-router-dom";

function FollowIconBtn() {
  const { user, setUser, isAuthenticated } = useAuth();
  const { currentSong } = usePlayBar();
  const navigate = useNavigate();

  // console.log("user's details from the FollowIconBtn = ", user);

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        isAuthenticated
          ? followUserToggler(currentSong?.user, user, setUser)
          : navigate("/login");
      }}
    >
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
