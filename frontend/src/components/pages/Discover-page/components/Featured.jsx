import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SongMainCard from "../../../ui/SongMainCard";
import { useQuery } from "@tanstack/react-query";
import songsServis from "../../../../services/songs.servis";
// import LessThanBtn from "../../../ui/lessThanBtn";
// import GreatorThanBtn from "../../../ui/GreatorThanBtn";
import { useSongsQueue } from "../../../../contexts/songsQueue";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

function Featured() {
  const [index, setIndex] = useState(0);
  const [pixelsToscroll, setPixelsToscroll] = useState(0);
  const [isHoverd, setIsHoverd] = useState(false);
  const cardRef = useRef();
  const { setSongsList } = useSongsQueue();

  const { data } = useQuery({
    queryKey: ["featuredSongs"],
    queryFn: songsServis.featuredSongs,
    staleTime: 8 * 60 * 1000,
  });

  const featuredSongs = data?.featuredSongs; // Don't need useMemo() because useQuery() will preserved the data(object's value and memory address )

  // console.log("the features songs ", data)

  useLayoutEffect(() => {
    const musicCard = cardRef?.current?.offsetWidth;
    setPixelsToscroll(musicCard + 20);
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

  // console.log("The featured songs = ", !!featuredSongs, "c index ", index);

  const songsQueueSetter = (currentSongId) => {
    const currentSongIndex = featuredSongs.findIndex(
      (song) => song.id === currentSongId,
    );
    setSongsList(featuredSongs, currentSongIndex, "featured-songs-section");
  };

  return (
    <div className="featured flex flex-col relative transition-all duration-500 ease-in-out w-full ">
      <div className="absolute inset-0 my-auto">
        <div
          className=" text-black bg-white w-5 h-5 flex justify-center items-center rounded-full border border-zinc absolute -left-1.5 top-26 z-40 cursor-pointer md:w-8 md:h-8 lg:top-32"
          onClick={() => handlePrev()}
        >
          <FaLessThan size={8} strokeWidth={0} />
        </div>
        <div
          className=" text-black bg-white w-5 h-5 flex justify-center items-center rounded-full border border-zinc absolute -right-3 top-26  z-100 cursor-pointer md:w-8 md:h-8 lg:top-32"
          onClick={() => handleNext()}
        >
          <FaGreaterThan size={8} strokeWidth={0}/>
        </div>
      </div>
      {/* <LessThanBtn handlePrev={handlePrev}  />
      <GreatorThanBtn handleNext={handleNext} /> */}
      <div className="text-2xl font-semibold">Featured</div>
      <div
        className={`featuredSongs w-full min-w-0   flex items-center overflow-x-scroll scrollbar-none`}
        onMouseEnter={() => setIsHoverd(true)}
        onMouseLeave={() => setIsHoverd(false)}
      >
        <div
          className="wider flex items-center gap-5"
          style={{
            transform: `translateX(${-pixelsToscroll * index}px)`,
            transition: "all 1200ms cubic-bezier(0.65, 0.06, 0.14, 0.92) ",
          }}
        >
          {featuredSongs &&
            featuredSongs.map((song) => (
              <SongMainCard
                key={song.id}
                cardRef={cardRef}
                song={song}
                onClick={songsQueueSetter}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Featured;

// import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import SongMainCard from "../../../ui/SongMainCard";
// import { useQuery } from "@tanstack/react-query";
// import songsServis from "../../../../services/songs.servis";
// import LessThanBtn from "../../../ui/lessThanBtn";
// import GreatorThanBtn from "../../../ui/GreatorThanBtn";
// import { useSongsQueue } from "../../../../contexts/songsQueue";

// function Featured() {
//   const [index, setIndex] = useState(0);
//   const [pixelsToscroll, setPixelsToscroll] = useState(0);
//   const [isHoverd, setIsHoverd] = useState(false);
//   const cardRef = useRef();
//   const { setSongsList } = useSongsQueue();

//   const { data } = useQuery({
//     queryKey: ["featuredSongs"],
//     queryFn: songsServis.featuredSongs,
//     staleTime: 8 * 60 * 1000,
//   });

//   const featuredSongs = data?.featuredSongs; // Don't need useMemo() because useQuery() will preserved the data(object's value and memory address )

//   // console.log("the features songs ", data)

//   useLayoutEffect(() => {
//     const musicCard = cardRef?.current?.offsetWidth;
//     setPixelsToscroll(musicCard + 28);
//     console.log("the card width = ", musicCard);
//   }, []);

//   const maxIndex = (featuredSongs?.length ?? 0) - 2;
//   // const maxIndex = featuredSongs;

//   const handleNext = () => setIndex((i) => Math.min(i + 1, maxIndex));
//   const handlePrev = () => setIndex((i) => Math.max(i - 1, 0));

//   useEffect(() => {
//     if (isHoverd) return;
//     const id = setInterval(() => {
//       setIndex((i) => (i < maxIndex ? i + 1 : 0));
//     }, 5000);
//     return () => clearInterval(id);
//   }, [isHoverd, maxIndex]);

//   // console.log("The featured songs = ", !!featuredSongs, "c index ", index);

//   const songsQueueSetter = (currentSongId) => {
//     const currentSongIndex = featuredSongs.findIndex(
//       (song) => song.id === currentSongId,
//     );
//     setSongsList(featuredSongs, currentSongIndex, "featured-songs-section");
//   };

//   return (
//     <div className="featured flex flex-col relative transition-all duration-500 ease-in-out w-full">
//       <LessThanBtn handlePrev={handlePrev} />
//       <GreatorThanBtn handleNext={handleNext} />
//       <div className="text-2xl font-semibold">Featured</div>
//       <div
//         className={`featuredSongs w-full min-w-0  2xl:w-247 flex items-center overflow-x-scroll scrollbar-none`}
//         onMouseEnter={() => setIsHoverd(true)}
//         onMouseLeave={() => setIsHoverd(false)}
//       >
//         <div
//           className="wider flex items-center gap-7 "
//           style={{
//             transform: `translateX(${-pixelsToscroll * index}px)`,
//             transition: "all 1200ms cubic-bezier(0.65, 0.06, 0.14, 0.92) ",
//           }}
//         >
//           {featuredSongs &&
//             featuredSongs.map((song) => (
//               <SongMainCard
//                 key={song.id}
//                 cardRef={cardRef}
//                 song={song}
//                 onClick={songsQueueSetter}
//               />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Featured;
