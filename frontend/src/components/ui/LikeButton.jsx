import { IoHeart } from "react-icons/io5";
import { useAuth } from "../../contexts/AuthProvider";
import likeSongToggler from "../../services/likeSongToggler";
import { useNavigate} from "react-router-dom"
import { useSongsQueue } from "../../contexts/songsQueue";

function LikeButton() {
   const { songsQueue, currentIndex } = useSongsQueue();
  const { user, setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate()

 

  return (
    <IoHeart
      className={`${user?.favourites?.includes(songsQueue[currentIndex]?.id) ? "text-primary" : "hover:text-zinc-600 "} cursor-pointer`}
      onClick={() =>{isAuthenticated? likeSongToggler(songsQueue[currentIndex].id, user, setUser) : navigate('/login') }}
    />
  );
}

export default LikeButton;
