import { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoHeart, IoPlaySharp } from "react-icons/io5";
import { useSongsQueue } from "../../contexts/songsQueue";
import { useEffect } from "react";

function NewSongsCards({ song, onClick, cardWidth }) {
  const [isPlayBtnVisible, setIsPlayBtnVisible] = useState(false);
  const [ currentSong, setCurrentSong ] = useState();
  const { songsQueue, currentIndex } = useSongsQueue();


  useEffect(() => {
    const helper = () => {
      try {
        setCurrentSong(songsQueue[currentIndex]);
      } catch (error) {
        console.error(error);
      }
    };
    helper();
  }, [songsQueue, currentIndex]);

  return (
    <div
      className={`song  flex flex-col w-${cardWidth ? cardWidth : 48} text-foreground`}
      onMouseEnter={() => setIsPlayBtnVisible(true)}
      onMouseLeave={() => setIsPlayBtnVisible(false)}
    >
      <div className="relative w-full group">
        <img
          src={song.songCover}
          alt={song.artist}
          className="w-full object-fill  h-42 rounded-md shadow-2xs group-hover:opacity-80 transition-all duration-1000 "
        />
        {currentSong?.id === song?.id ? (
          <FaPause
            className="absolute inset-0 m-auto text-white outline-none cursor-pointer drop-shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:drop-shadow-[0_10px_8px_rgba(0,0,0,0.5)]"
            size={25}
            // onClick={() => setCurrentSong("")}
          />
        ) : (
          isPlayBtnVisible && (
            <FaPlay
              className="absolute inset-0 m-auto text-white outline-none cursor-pointer drop-shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:drop-shadow-[0_10px_8px_rgba(0,0,0,0.5)]"
              size={25}
              onClick={() => {
                console.log("successful click and the current id = ", song.id);
                onClick(song?.id);
              }}
            />
          )
        )}
      </div>
      <div className="details flex justify-between">
        <div>
          <div className="text-[12px] font-medium">
            {song.title.length > 20
              ? song.title.slice(0, 20).concat("...")
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
            {song?.likes?.length || song.totalLikes || 0}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewSongsCards;
