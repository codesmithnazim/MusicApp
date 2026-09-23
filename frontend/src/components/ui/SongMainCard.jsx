import { memo, useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoPlaySharp } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { useSongsQueue } from "../../contexts/songsQueue";

function SongMainCard({ cardRef, song, onClick }) {
  const [isPlayBtnVisible, setIsPlayBtnVisible] = useState(false);
  const [currentSong, setCurrentSong] = useState();
  const { songsQueue, currentIndex } = useSongsQueue();
  
  console.log("SMC is re-rendered");

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
      className="song  flex flex-col w-120 h-83 text-foreground"
      ref={cardRef}
      onMouseEnter={() => setIsPlayBtnVisible(true)}
      onMouseLeave={() => setIsPlayBtnVisible(false)}
    >
      <div className="relative w-full group">
        <img
          src={song.songCover}
          alt={song.artist}
          className="w-full object-fill object-center h-68 rounded-md shadow-2xs group-hover:opacity-80 transition-all duration-1000 "
        />
        {currentSong?.id === song?.id ? (
          <FaPause
            className="absolute inset-0 m-auto text-white outline-none cursor-pointer drop-shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:drop-shadow-[0_10px_8px_rgba(0,0,0,0.5)]"
            size={40}
            // onClick={() => setCurrentSong("")}
          />
        ) : (
          isPlayBtnVisible && (
            <FaPlay
              className="absolute inset-0 m-auto text-white outline-none cursor-pointer drop-shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:drop-shadow-[0_10px_8px_rgba(0,0,0,0.5)]"
              size={40}
              onClick={() => {
                console.log("successful click and the current id = ", song.id);
                onClick(song.id);
              }}
            />
          )
        )}
      </div>
      <div className="details flex justify-between">
        <div>
          <div className="font-medium ">
            {song.title.length > 32
              ? song.title.slice(0, 32).concat("...")
              : song.title}
          </div>
          <div className="text-xs text-muted">{song.artist}</div>
        </div>
        <div className="playsAndLikes self-end w-fit text-foreground flex gap-3">
          <div className="plays flex items-center gap-1 text-muted">
            {<IoPlaySharp />}
            {song?.plays || 0}
          </div>
          <div className="plays flex items-center gap-1 text-muted">
            {<IoHeart />}
            {song?.likes?.length || 0}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(SongMainCard);
