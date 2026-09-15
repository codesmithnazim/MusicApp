import { IoHeart } from "react-icons/io5";
import { usePlayBar } from "../../contexts/PlayerContext";
import songServise from "../../services/song.servise";
import { useState } from "react";

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false)
  const { currentSong } = usePlayBar();

  const likeHandler = async () => {
    try {
      const {ok} = await songServise.likesIncrementor(
        currentSong.id,
      );
      if(ok) setIsLiked(true)
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <IoHeart
      className={`${isLiked? "text-primary" : "hover:text-zinc-600 " } cursor-pointer`}
      onClick={likeHandler}
    />
  );
}

export default LikeButton;
