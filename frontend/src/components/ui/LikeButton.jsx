import { IoHeart } from "react-icons/io5";
import { usePlayBar } from "../../contexts/PlayerContext";
import { useAuth } from "../../contexts/AuthProvider";
import likeSongToggler from "../../services/likeSongToggler";

function LikeButton() {
  const { currentSong } = usePlayBar();
  const { user, setUser } = useAuth();

  return (
    <IoHeart
      className={`${user?.favourites?.includes(currentSong.id) ? "text-primary" : "hover:text-zinc-600 "} cursor-pointer`}
      onClick={() => likeSongToggler(currentSong, user, setUser)}
    />
  );
}

export default LikeButton;
