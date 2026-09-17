import { useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

function SoundScubber({ volume, setVolume }) {
  const [volumeRangeIsvisible, setVolumeRangeIsvisible] = useState(false);

  const handleSeek = (e) => {
    setVolume(e.target.value);
  };

  // const  ChangeVolumeRangevisiblity=()=>{

  // }
  return (
    <div className=" relative cursor-pointer ">
      <HiOutlineSpeakerWave
        size={20}
        onMouseEnter={() => setVolumeRangeIsvisible(true)}
        onMouseLeave={() => setVolumeRangeIsvisible(false)}
      />
      {volumeRangeIsvisible && (
        <div
          className="absolute flex items-center justify-center w-26 h-6 bottom-15.5 -left-11 bg-muted rotate-270 rounded-md"
          onMouseEnter={() => setVolumeRangeIsvisible(true)}
          onMouseLeave={() => setVolumeRangeIsvisible(false)}
        >
          <input
            type="range"
            min={0}
            max={1}
            step={0.025}
            value={volume}
            onChange={handleSeek}
            className=" w-20 h-1  bg-primary rounded-full appearance-none cursor-pointer outline-none
         
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
        </div>
      )}
    </div>
  );
}

export default SoundScubber;
