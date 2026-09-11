import { memo } from "react";
import { FaPlay } from "react-icons/fa";
import { usePlayBar } from "../../contexts/PlayerContext";

function SongMainCard({ cardRef, song }) {
  // console.log("the song details = ", imageSrc, audioSongSrc, content)
  //   const handleMouseEnter=()=>{
  // cardRef.current.style.opacity= 80
  // cardRef.current.style.color= "red"
  // }
  //   const handleMouseLeave=()=>{
  // cardRef.current.style.opacity= 80
  // cardRef.current.style.color= "black"
  // }

  const { currentSong, setCurrentSong } = usePlayBar();

  // console.log("the song deatils from the main songCard ", song);

  return (
    <div
      className="song  flex flex-col w-120 h-83 text-foreground"
      ref={cardRef}
    >
      <div className="relative w-full group">
        <img
          src={song.songCover}
          alt={song.artist}
          className="w-full object-cover h-68 rounded-md shadow-2xs group-hover:opacity-80 transition-all duration-1000 "
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        />
        <FaPlay
          className="absolute top-28 left-52 text-white outline-none cursor-pointer drop-shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:drop-shadow-[0_10px_8px_rgba(0,0,0,0.5)]"
          size={40}
          onClick={() => setCurrentSong(song)}
        />
      </div>
      <div>{song.title}</div>
      <div>{song.artist}</div>
    </div>
  );
}

export default memo(SongMainCard);
