import { IoHeart } from "react-icons/io5";
import { usePlayBar } from "../../contexts/PlayerContext";
import songServise from "../../services/song.servise";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const { currentSong } = usePlayBar();
  const { user } = useAuth();

  console.log("the current user = ", user)

  useEffect(() => {
    const dummy = () => {
      try {
        if (user.favourites.includes(currentSong.id)){
          console.log("this song is the user favourite song ");
       return setIsLiked(true);
        }
        setIsLiked(false)
      } catch (error) {
        console.error("the error = ", error);
      }
    };
    dummy()
  }, [user, currentSong]);

  const likeHandler = async () => {
    try {
      const { ok } = await songServise.likesIncrementor(currentSong.id);
      if (ok) setIsLiked(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <IoHeart
      className={`${isLiked ? "text-primary" : "hover:text-zinc-600 "} cursor-pointer`}
      onClick={likeHandler}
    />
  );
}

export default LikeButton;
