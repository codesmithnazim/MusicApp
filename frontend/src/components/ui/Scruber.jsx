import { useEffect, useState } from "react";
import SoundScubber from "./SoundScubber";

function Scruber({
  songAudioRef,
  duration,
  currentSong,
  handleLoadedMetadata,
  setIsPlay,
  isrepeat
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    songAudioRef.current.volume = volume;
  }, [ volume ]);

  // console.log("the data of scrubber audio url ", currentSong)

  const timeChangeHandler = (e) => {
    setCurrentTime(e.target.currentTime);
    // console.log("current time= ", currentTime);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (songAudioRef.current) {
      songAudioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Pad with leading zeros if under 10
    const displayMinutes = minutes.toString().padStart(2, "0");
    const displaySeconds = remainingSeconds.toString().padStart(2, "0");
    return `${displayMinutes}:${displaySeconds}`;
  }

        // {isrepeat?( songAudioRef.loop= true) : ""}


  return (
    <div className="flex items-center gap-3">
      {" "}
      <audio
        src={currentSong.audioUrl}
        // controls
        className="absolute -top-40"
        onTimeUpdate={timeChangeHandler}
        ref={songAudioRef}
        onLoadedMetadata={handleLoadedMetadata}
        loop={isrepeat}
        // onPlay={() => setIsPlay(true)}
        // onPause={() => setIsPlay(false)}
        onEnded={() => setIsPlay(false)}
      ></audio>
      <div className="scrubber flex items-center gap-3">
        {/* <input type="range" name="audioSlider" id="audioSlider" className="w-120 h-1  accent-foreground cursor-pointer" /> */}
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          step={0.05}
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
        <div className="duration text-sm ">
          {formatTime(currentTime)}/ {formatTime(duration)}{" "}
        </div>
      </div>
      <SoundScubber setVolume={setVolume} volume={volume} />
    </div>
  );
}

export default Scruber;
