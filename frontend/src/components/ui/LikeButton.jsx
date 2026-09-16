import { IoHeart } from "react-icons/io5";
import { usePlayBar } from "../../contexts/PlayerContext";
import { useAuth } from "../../contexts/AuthProvider";
import likeSongToggler from "../../services/likeSongToggler";
import { useNavigate} from "react-router-dom"

function LikeButton() {
  const { currentSong } = usePlayBar();
  const { user, setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate()

 

  return (
    <IoHeart
      className={`${user?.favourites?.includes(currentSong.id) ? "text-primary" : "hover:text-zinc-600 "} cursor-pointer`}
      onClick={() =>{isAuthenticated? likeSongToggler(currentSong?.id, user, setUser) : navigate('/login') }}
    />
  );
}

export default LikeButton;
