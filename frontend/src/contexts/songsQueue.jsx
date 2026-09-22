import { useContext, useState } from "react";
import { SongsQueueContext } from "./contexts";

function SongsQueueContextP({ children }) {
  const [songsQueue, setSongsQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setSongsList = (list, currentSongPos, provider) => {
    setSongsQueue(list);
    setCurrentIndex(currentSongPos);
  };

  const playNext = () =>  setCurrentIndex((prev) => Math.min(prev + 1, songsQueue.length - 1));
  const playPrevious = () =>   setCurrentIndex((prev) => Math.max(prev - 1, 0));
  
  console.log(
    "the new songs queue ",
    songsQueue,
    "and the currnet song position in the array ",
    currentIndex,
  );
  return (
    <SongsQueueContext.Provider
      value={{ songsQueue, currentIndex, setSongsList, playPrevious, playNext }}
    >
      {children}
    </SongsQueueContext.Provider>
  );
}

const useSongsQueue = () => {
  const context = useContext(SongsQueueContext);
  return context;
};

export default SongsQueueContextP;
export { useSongsQueue };
