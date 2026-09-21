import { memo, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { usePlayBar } from "../../contexts/PlayerContext";
import songServise from "../../services/song.servise";
import { IoPlaySharp } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

function SongMainCard({ cardRef, song }) {
  const [isPlayBtnVisible, setIsPlayBtnVisible] = useState(false);
  const { currentSong, setCurrentSong } = usePlayBar();

  // console.log("the song deatils from the main songCard ", song);
  // const { data } = useQuery({
  //   queryKey: ["specificSong"],
  //   queryFn: ()=> songServise.getSong(newSongID),
  // });
  console.log("SMC is re-rendered");

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
        {currentSong.id === song.id ? (
          <FaPause
            className="absolute inset-0 m-auto text-white outline-none cursor-pointer drop-shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:drop-shadow-[0_10px_8px_rgba(0,0,0,0.5)]"
            size={40}
            onClick={() => setCurrentSong("")}
          />
        ) : (
          isPlayBtnVisible && (
            <FaPlay
              className="absolute inset-0 m-auto text-white outline-none cursor-pointer drop-shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:drop-shadow-[0_10px_8px_rgba(0,0,0,0.5)]"
              size={40}
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
