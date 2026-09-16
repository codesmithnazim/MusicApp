import { IoHeart } from "react-icons/io5";
import { usePlayBar } from "../../contexts/PlayerContext";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import likeSongToggler from "../../services/likeSongToggler";

function LikeButton() {
  const { currentSong } = usePlayBar();
  const [userFullDetails, setUserFullDetails] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const dummy = () => {
      try {
        setUserFullDetails(user);
      } catch (error) {
        console.error("the error = ", error);
      }
    };
    dummy();
  }, [user]);


  return (
    <IoHeart
      className={`${userFullDetails?.favourites?.includes(currentSong.id) ? "text-primary" : "hover:text-zinc-600 "} cursor-pointer`}
      onClick={()=> likeSongToggler(currentSong,userFullDetails,setUserFullDetails)}   
    />
  );
}

export default LikeButton;
