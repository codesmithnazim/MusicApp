import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import { TiArrowRepeat } from "react-icons/ti";
import { IoShuffleOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Scruber from "./ui/Scruber";
import LikeButton from "./ui/LikeButton";
import FollowIconBtn from "./ui/FollowIconBtn";
import { useSongsQueue } from "../contexts/songsQueue";
import songServise from "../services/song.servise";

function PlayingBar() {
  const [duration, setDuration] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [isrepeat, setIsrepeat] = useState(false);
  const songAudioRef = useRef();
  const [currentSong, setCurrentSong] = useState();
  const { songsQueue, currentIndex, playPrevious, playNext } = useSongsQueue();

  // console.log("current song at the playingBar ", songsQueue[currentIndex]);

  useEffect(() => {
    const helper = async () => {
      try {
        const { song: fetchedSong } = await songServise.getSong(
          songsQueue[currentIndex]?.id,
        );
        console.log("fetched song data:", fetchedSong);
        setCurrentSong(fetchedSong); // you already have this from usePlayBar
      } catch (error) {
        console.log(error);
      }
      setIsPlay(false);
      setIsloading(true);
    };
    helper();
  }, [songsQueue, currentIndex]);

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
    <div className=" h-10 w-full min-w-0 border-t border-t-primary bg-background  fixed bottom-0 left-0 flex items-center justify-end box-border px-0.5 sm:px-4 ">
      <section className="main w-full  flex gap-2 items-center sm:gap-4 md:gap-8">
        <div className="controls flex gap-1 items-start sm:gap-3">
          <MdOutlineSkipPrevious
            className="text-foreground cursor-pointer"
            size={20}
            title="previous"
            onClick={playPrevious}
          />
          <div className="playOrStop relative w-4 h-4">
            <button
              className="cursor-pointer outline-none"
              onClick={() => playController()}
            >
              {isPlay ? (
                <FaRegCirclePause className="text-foreground" size={15} />
              ) : (
                <FaRegCirclePlay className="text-foreground" size={15} />
              )}
            </button>
            {isloading && (
              <AiOutlineLoading3Quarters
                className="animate-spin absolute inset-0 top-1 text-background"
                size={15}
                strokeWidth={2}
              />
            )}
          </div>
          {/* <button>{<FaRegCirclePause className="text-foreground" size={22} />}</button> */}
          <MdOutlineSkipNext
            className="text-foreground cursor-pointer"
            size={20}
            title="next"
            onClick={playNext}
          />
        </div>
        <div className="modernControls flex gap-3 items-center">
          <TiArrowRepeat
            className={`${isrepeat ? "text-primary" : "text-foreground"} cursor-pointer`}
            size={18}
            strokeWidth={0}
            onClick={() => setIsrepeat((curr) => !curr)}
          />
          {/* <IoShuffleOutline className="text-foreground" size={20} /> */}
        </div>
        <Scruber
          songAudioRef={songAudioRef}
          duration={duration}
          currentSong={currentSong}
          handleLoadedMetadata={handleLoadedMetadata}
          setIsPlay={setIsPlay}
          isrepeat={isrepeat}
        />
        <section className="about flex gap-2 items-center text-xs sm:gap-3">
          <div className="songCoverImage  w-6 h-6 overflow-hidden rounded gap-0.5 object-contain sm:h-8 sm:w-8">
            <img
              src={currentSong?.coverUrl}
              alt="coverPic of the media"
              className="w-full h-full "
            />
          </div>
          <div className="about text-[6px] font-semibold flex flex-col items-start  sm:text-[10px] ">
            <div className="singer text-muted ">
              {currentSong.artist.length > 17
                ? currentSong.artist.slice(0, 22).concat("...")
                : currentSong.artist}
            </div>
            <div className="songName text-foreground ">
              {currentSong.title.length > 22
                ? currentSong.title.slice(0, 22).concat("...")
                : currentSong.title}
            </div>
          </div>
        </section>
        <div className="CTA flex  gap-2 text-muted sm:gap-3 ">
          <LikeButton />
          <FollowIconBtn />
        </div>
        <RxCross2
          className="absolute top-1 right-1 cursor-pointer text-muted text-xs"
          onClick={() => setCurrentSong("")}
        />
      </section>
    </div>
  );
}

export default PlayingBar;
