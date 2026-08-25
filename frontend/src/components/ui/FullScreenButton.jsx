import { useEffect, useState } from "react";
import { RiFullscreenExitFill } from "react-icons/ri";
import { RiFullscreenFill } from "react-icons/ri";

function FullScreenButton() {
  const [FullScreen, setFullScreen] = useState(!!document.fullscreenElement);

  const changeScreenSize = () => {
    FullScreen
      ? document.exitFullscreen()
      : document.querySelector(".musicApp").requestFullscreen();
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      setFullScreen(!!document.fullscreenElement);
    });
    return () => document.removeEventListener("fullscreenchange");
  }, []);

  return (
    <div
      onClick={changeScreenSize}
      className={`flex justify-start items-center gap-2 py-1 px-2 rounded-md text-sm font-medium transition-all w-41 hover:bg-zinc-100 text-zinc-600  text-[13px] cursor-pointer`}
    >
      {FullScreen ? (
        <RiFullscreenExitFill strokeWidth={1} size={15} />
      ) : (
        <RiFullscreenFill strokeWidth={1} size={15} />
      )}
      {FullScreen ? "Exit Fullscreen" : "FullScreen"}
    </div>
  );
}

export default FullScreenButton;
