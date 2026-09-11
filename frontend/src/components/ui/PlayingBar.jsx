import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import { TiArrowRepeat } from "react-icons/ti";
import { IoShuffleOutline } from "react-icons/io5";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { usePlayBar } from "../../contexts/PlayerContext";
import Scruber from "./Scruber";

function PlayingBar() {
  const [duration, setDuration] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const songAudioRef = useRef();
  const { currentSong } = usePlayBar();

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
    <div className="w-screen h-12 border border-t-primary bg-background  absolute bottom-0 left-0 flex items-center">
      <section className="main w-4/6 mx-auto flex gap-8 items-center">
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
            className="text-foreground"
            size={20}
            strokeWidth={0}
          />
          <IoShuffleOutline className="text-foreground" size={20} />
        </div>
        <Scruber
          songAudioRef={songAudioRef}
          duration={duration}
          currentSong={currentSong}
          handleLoadedMetadata={handleLoadedMetadata}
          setIsPlay={setIsPlay}
        />

        <div>
          <HiOutlineSpeakerWave size={20} />
        </div>
      </section>
    </div>
  );
}

export default PlayingBar;
