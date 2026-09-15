import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SongMainCard from "../../../ui/SongMainCard";
import { useQuery } from "@tanstack/react-query";
import songsServis from "../../../../services/songs.servis";
import LessThanBtn from "../../../ui/lessThanBtn";
import GreatorThanBtn from "../../../ui/GreatorThanBtn";

function Featured() {
  const [index, setIndex] = useState(0);
  const [pixelsToscroll, setPixelsToscroll] = useState(0);
  const [isHoverd, setIsHoverd] = useState(false);
  const cardRef = useRef();
  
  const { data } = useQuery({
    queryKey: ["featuredSongs"],
    queryFn: songsServis.featuredSongs,
    staleTime: 8 * 60 * 1000,  
  });

  const featuredSongs = data?.featuredSongs; // Don't need useMemo() because useQuery() will preserved the data(object's value and memory address )

console.log("the features songs ", data)

  useLayoutEffect(() => {
    const musicCard = cardRef?.current?.offsetWidth;
    setPixelsToscroll(musicCard + 28);
    console.log("the card width = ", musicCard);
  }, []);

  const maxIndex = (featuredSongs?.length ?? 0) - 2;
  // const maxIndex = featuredSongs;

  const handleNext = () => setIndex((i) => Math.min(i + 1, maxIndex));
  const handlePrev = () => setIndex((i) => Math.max(i - 1, 0));

  useEffect(() => {
    if (isHoverd) return;
    const id = setInterval(() => {
      setIndex((i) => (i < maxIndex ? i + 1 : 0));
    }, 5000);
    return () => clearInterval(id);
  }, [isHoverd, maxIndex]);

  console.log("The featured songs = ", !!featuredSongs, "c index ", index);

  return (
    <div className="featured flex flex-col relative transition-all duration-500 ease-in-out">
      <LessThanBtn handlePrev={handlePrev} />
      <GreatorThanBtn handleNext={handleNext} />

      <div className="text-2xl font-semibold">Featured</div>
      <div
        className={` featuredSongs  w-247  flex items-center overflow-x-scroll scrollbar-none  `}
        onMouseEnter={() => setIsHoverd(true)}
        onMouseLeave={() => setIsHoverd(false)}
      >
        <div
          className="wider flex items-center gap-7 "
          style={{
            transform: `translateX(${-pixelsToscroll * index}px)`,
            transition: "all 1200ms cubic-bezier(0.65, 0.06, 0.14, 0.92) ",
          }}
        >
          {featuredSongs &&
            featuredSongs.map((song) => (
              <SongMainCard key={song.id} cardRef={cardRef} song={song} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Featured;

{
  /* <SongMainCard cardRef={cardRef} imageSrc={"../../../../../songCover2.jpg"} alt={"songCoverPic"} content={"Narai Baran de sapalwaar ye waara we na"} />
  <SongMainCard cardRef={cardRef} imageSrc={"../../../../../songCover3.jpg"} alt={"songCoverPic"} content={"Narai Baran de sapalwaar ye waara we na"} />
  <SongMainCard cardRef={cardRef} imageSrc={"../../../../../songCover4.jpg"} alt={"songCoverPic"} content={"Narai Baran de sapalwaar ye waara we na"} /> */
}
