import { RiUserFollowLine } from "react-icons/ri";
import { useAuth } from "../../contexts/AuthProvider";
import followUserToggler from "../../services/followUserToggler";
import { useNavigate } from "react-router-dom";
import { useSongsQueue } from "../../contexts/songsQueue";

function FollowIconBtn() {
  const { user, setUser, isAuthenticated } = useAuth();
  const { songsQueue, currentIndex } = useSongsQueue();
  const navigate = useNavigate();

  // console.log("user's details from the FollowIconBtn = ", user);

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        isAuthenticated
          ? followUserToggler(songsQueue[currentIndex]?.user, user, setUser)
          : navigate("/login");
      }}
    >
      {user?.songs?.includes(songsQueue[currentIndex]?.id) ? (
        ""
      ) : (
        <RiUserFollowLine
          className={`${user?.followings?.includes(songsQueue[currentIndex]?.user) ? "text-primary" : ""} hover:text-zinc-600 `}
        />
      )}
    </div>
  );
}

export default FollowIconBtn;
