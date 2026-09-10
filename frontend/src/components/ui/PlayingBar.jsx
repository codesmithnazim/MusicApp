import { FaRegCirclePause } from "react-icons/fa6";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdOutlineSkipPrevious } from "react-icons/md";
import { MdOutlineSkipNext } from "react-icons/md";
import { TiArrowRepeat } from "react-icons/ti";
import { IoShuffleOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

function PlayingBar() {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const songAudioRef = useRef();
  // console.log("song is playing ", isPlay);

  // Helper function to format raw seconds into MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Pad with leading zeros if under 10
    const displayMinutes = minutes.toString().padStart(2, "0");
    const displaySeconds = remainingSeconds.toString().padStart(2, "0");

    return `${displayMinutes}:${displaySeconds}`;
  }

  useEffect(() => {
    if (!songAudioRef.current) return;
    isPlay
      ? songAudioRef.current.play().catch(() => setIsPlay(false))
      : songAudioRef.current.pause();
    console.log("song is playing = ", isPlay);
  }, [isPlay]);

  const timeChangeHandler = (e) => {
    setCurrentTime(e.target.currentTime);
    console.log("the current time of the song = ", currentTime);
  };

  const handleLoadedMetadata = (e) => {
    const songduration = e.target.duration;
    setDuration(songduration);
    setIsPlay(true);
    console.log("The song duration = ", songduration);
  };

  const handleSeek = (e) => {
    const newTime= parseFloat(e.target.value)
    if(songAudioRef.current){
      songAudioRef.current.currentTime= newTime
      setCurrentTime(newTime)
    }
  };

  return (
    <div className="w-screen h-12 border border-red-600  absolute bottom-0 left-0 flex items-center">
      <section className="main w-4/6 mx-auto flex gap-8">
        <div className="controls flex gap-5 items-center">
          <MdOutlineSkipPrevious className="text-foreground" size={26} />
          <button
            className="cursor-pointer outline-none"
            onClick={() => setIsPlay((current) => !current)}
          >
            {isPlay ? (
              <FaRegCirclePause className="text-foreground" size={22} />
            ) : (
              <FaRegCirclePlay className="text-foreground" size={22} />
            )}
          </button>
          {/* <button>{<FaRegCirclePause className="text-foreground" size={22} />}</button> */}
          <MdOutlineSkipNext className="text-foreground" size={26} />
        </div>
        <div className="modernControls flex gap-5 items-center">
          <TiArrowRepeat
            className="text-foreground"
            size={20}
            strokeWidth={0}
          />
          <IoShuffleOutline className="text-foreground" size={20} />
        </div>
        <audio
          src="../../../Da Khkulo Yari - Ma Wail Ka Tokey Maskharey Dey - Shan Khan & Faisal Salman Khan.mp3.m4a"
          // controls
          className="absolute -top-40"
          onTimeUpdate={timeChangeHandler}
          ref={songAudioRef}
          onLoadedMetadata={handleLoadedMetadata}
          // onPlay={() => setIsPlay(true)}
          // onPause={() => setIsPlay(false)}
          onEnded={() => setIsPlay(false)}
        ></audio>

        <div className="scrubber flex items-center gap-5">
          {/* <input type="range" name="audioSlider" id="audioSlider" className="w-120 h-1  accent-foreground cursor-pointer" /> */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className=" w-120 h-1 bg-primary rounded-full appearance-none cursor-pointer outline-none
         
         /* Webkit (Chrome, Safari, Edge, Opera) Thumb Styling */
         [&::-webkit-slider-thumb]:appearance-none 
         [&::-webkit-slider-thumb]:h-3
         [&::-webkit-slider-thumb]:w-3 
         [&::-webkit-slider-thumb]:hover:w-4
         [&::-webkit-slider-thumb]:hover:h-4
         [&::-webkit-slider-thumb]:bg-background
         [&::-webkit-slider-thumb]:border-2
         [&::-webkit-slider-thumb]:border-foreground
         [&::-webkit-slider-thumb]:rounded-full 
         [&::-webkit-slider-thumb]:hover:border-3
         [&::-webkit-slider-thumb]:hover:border-primary
         [&::-webkit-slider-thumb]:transition-all
         [&::-webkit-slider-thumb]:duration-150
         
         /* Mozilla Firefox Thumb Styling */
         [&::-moz-range-thumb]:h-3
         [&::-moz-range-thumb]:appearance-none 
         [&::-moz-range-thumb]:w-3 
         [&::-moz-range-thumb]:hover:w-4
         [&::-moz-range-thumb]:hover:h-4
         [&::-moz-range-thumb]:bg-background
         [&::-moz-range-thumb]:border-2
         [&::-moz-range-thumb]:border-foreground
         [&::-moz-range-thumb]:rounded-full 
         [&::-moz-range-thumb]:hover:border-3
         [&::-moz-range-thumb]:hover:border-primary
         [&::-moz-range-thumb]:transition-colors
         [&::-moz-range-thumb]:duration-150"
          />
          <div className="duration flex ">
            {" "}
            {formatTime(currentTime)}/ {formatTime(duration)}{" "}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlayingBar;
