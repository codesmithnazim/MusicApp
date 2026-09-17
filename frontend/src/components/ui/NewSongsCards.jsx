import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoHeart, IoPlaySharp } from "react-icons/io5";
import { usePlayBar } from "../../contexts/PlayerContext";
import songServise from "../../services/song.servise";
function NewSongsCards({ song }) {
  const [isPlayBtnVisible, setIsPlayBtnVisible] = useState(false);
  const { currentSong, setCurrentSong } = usePlayBar();

  const handlePlayClick = async () => {
    console.log("clicked, song id =", song?.id);
    try {
      const { song: fetchedSong } = await songServise.getSong(song.id);
      console.log("fetched song data:", fetchedSong);
      setCurrentSong(fetchedSong); // you already have this from usePlayBar
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="song  flex flex-col w-45  text-foreground"
      onMouseEnter={() => setIsPlayBtnVisible(true)}
      onMouseLeave={() => setIsPlayBtnVisible(false)}
    >
      <div className="relative w-full group">
        <img
          src={song.songCover}
          alt={song.artist}
          className="w-full object-fill  h-42 rounded-md shadow-2xs group-hover:opacity-80 transition-all duration-1000 "
        />
        {currentSong.id === song.id ? (
          <FaPause
            className="absolute top-18 left-20 text-white outline-none cursor-pointer drop-shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:drop-shadow-[0_10px_8px_rgba(0,0,0,0.5)]"
            size={25}
            onClick={() => setCurrentSong("")}
          />
        ) : (
          isPlayBtnVisible && (
            <FaPlay
              className="absolute top-18 left-20 text-white outline-none cursor-pointer drop-shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:drop-shadow-[0_10px_8px_rgba(0,0,0,0.5)]"
              size={25}
              onClick={() => {
                console.log("successful click and the current id = ", song.id);
                handlePlayClick();
              }}
            />
          )
        )}
      </div>
      <div className="details flex justify-between">
        <div>
          <div className="text-[12px] font-medium">
            {song.title.length > 10
              ? song.title.slice(0, 17).concat("...")
              : song.title}
          </div>
        </div>
        <div className="playsAndLikes self-end w-fit text-foreground flex gap-1 text-[12px]">
          <div className="plays flex items-center gap-0.5 text-muted">
            {<IoPlaySharp />}
            {song?.plays || 0}
          </div>
          <div className="plays flex items-center gap-0.5 text-muted">
            {<IoHeart />}
            {song?.likes?.length || 0}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewSongsCards;
