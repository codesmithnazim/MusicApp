import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import { TiArrowRepeat } from "react-icons/ti";
import { IoShuffleOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import {  RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import Scruber from "./ui/Scruber";
import { usePlayBar } from "../contexts/PlayerContext";
import LikeButton from "./ui/LikeButton";

function PlayingBar() {
  const [duration, setDuration] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [isrepeat, setIsrepeat] = useState(false);
  const songAudioRef = useRef();
  const { currentSong } = usePlayBar();

  console.log("current song at the playingBar ", currentSong)

  useEffect(() => {
    setIsPlay(false);
    setIsloading(true);

    return () => {};
  }, [currentSong]);

  // useEffect(() => {
  //   if (!songAudioRef.current) {
  //     setIsPlay(false)
  //     return;
  //   }
  //   isPlay
  //     ? songAudioRef.current
  //         .play()
  //         .then(() => {
  //           setIsPlay(true);
  //           setIsloading(false);
  //         })
  //         .catch(() => setIsPlay(false))
  //     : songAudioRef.current.pause();
  //   console.log("song is playing = ", isPlay);

  // }, [ currentSong ]);
  const playController = async () => {
    try {
      (await isPlay)
        ? songAudioRef.current.pause()
        : songAudioRef.current.play();
      setIsPlay((curr) => !curr);
    } catch (error) {
      console.error("error ", error);
    }
  };

  console.log("The current song = ", currentSong);

  if (!currentSong) return;
  // console.log("song is playing ", isPlay);

  // Helper function to format raw seconds into MM:SS
  console.log("It should not re-render. Ok!");

  const handleLoadedMetadata = async (e) => {
    const songduration = e.target.duration;
    setDuration(songduration);
    setIsPlay(true);
    await songAudioRef.current.play();
    setIsloading(false);
    console.log("The song duration = ", songduration);
  };




  return (
    <div className="w-screen h-12 border-t border-t-primary bg-background  absolute bottom-0 left-0 flex items-center justify-end">
      <section className="main w-5/6  flex gap-8 items-center">
        <div className="controls flex gap-5 items-center">
          <MdOutlineSkipPrevious className="text-foreground" size={26} />
          <div className="playOrStop relative w-5.5 h-5.5">
            <button
              className="cursor-pointer outline-none"
              onClick={() => playController()}
            >
              {isPlay ? (
                <FaRegCirclePause className="text-foreground" size={22} />
              ) : (
                <FaRegCirclePlay className="text-foreground" size={22} />
              )}
            </button>
            {isloading && (
              <div className="absolute top-0 left-0 w-full h-full border-[2.5px]  border-gray-400 border-b-white animate-spin rounded-full pointer-events-none"></div>
            )}
          </div>
          {/* <button>{<FaRegCirclePause className="text-foreground" size={22} />}</button> */}
          <MdOutlineSkipNext className="text-foreground" size={26} />
        </div>
        <div className="modernControls flex gap-3 items-center">
          <TiArrowRepeat
            className={`${isrepeat ? "text-primary" : "text-foreground"} cursor-pointer`}
            size={20}
            strokeWidth={0}
            onClick={() => setIsrepeat((curr) => !curr)}
          />
          <IoShuffleOutline className="text-foreground" size={20} />
        </div>
        <Scruber
          songAudioRef={songAudioRef}
          duration={duration}
          currentSong={currentSong}
          handleLoadedMetadata={handleLoadedMetadata}
          setIsPlay={setIsPlay}
          isrepeat={isrepeat}
        />
        <section className="about flex gap-1 items-center ">
          <div className="songCoverImage h-10 w-10 overflow-hidden rounded gap-0.5 object-contain ">
            <img
              src={currentSong?.coverUrl}
              alt="coverPic of the media"
              className="h-10 w-10"
            />
          </div>
          <div className="about flex flex-col justify-center h-10 ">
            {/* <div className="singer text-xs font-semibold text-muted">Zartash Khan 🌺</div>
            <div className="songName text-foreground text-xs font-semibold"> { "Alia Ansari - Khayat ✨✨✨".length>22?"Alia Ansari - Khayat ✨✨✨".slice(0,22).concat("..."):"Alia Ansari - Khayat ✨✨✨" }</div> */}
            <div className="singer text-xs font-semibold text-muted"> {currentSong.artist.length>17?currentSong.artist.slice(0,22).concat("..."):currentSong.artist }</div>
            <div className="songName text-foreground text-xs font-semibold"> {currentSong.title.length>22?currentSong.title.slice(0,22).concat("..."):currentSong.title }</div>
          </div>
        </section>
        <div className="CTA flex  gap-4 text-muted">
          <LikeButton/>
          <RiUserFollowLine className={`hover:text-zinc-600 cursor-pointer`} />
          {/* <RiUserUnfollowLine className={`hover:text-zinc-600`} /> */}
        </div>
      </section>
    </div>
  );
}

export default PlayingBar;
