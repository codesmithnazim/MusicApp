import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaGreaterThan } from "react-icons/fa6";
import { FaLessThan } from "react-icons/fa6";
import SongMainCard from "../../../ui/SongMainCard";

function Featured() {
  const [index, setIndex] = useState(0);
  const [pixelsToscroll, setPixelsToscroll] = useState(0);
  const [isHoverd, setIsHoverd] = useState(false)
  const cardRef = useRef();
  useLayoutEffect(() => {
    const musicCard = cardRef?.current.offsetWidth;
    setPixelsToscroll(musicCard + 28);
    console.log("the card width = ",musicCard);
  }, []);

  const maxIndex = document.querySelectorAll(".song").length - 2;
  // console.log(
  //   "the max index value = ",
  //   maxIndex,
  //   "and the current index = ",
  //   index,
  // );
  const handleNext = () => setIndex((i) => Math.min(i + 1, maxIndex));
  const handlePrev = () => setIndex((i) => Math.max(i - 1, 0));

  useEffect(() => {
    if(isHoverd) return;
  const id=  setInterval(() => {
      setIndex((i) => (i < maxIndex? i+1 : 0));
    }, 5000);
    return () =>  clearInterval(id)
  }, [isHoverd,maxIndex ]);


  return (
    <div className="featured flex flex-col relative transition-all duration-500 ease-in-out">
      <button
        className="navigator text-black bg-white w-10 h-10 flex justify-center items-center rounded-full border border-zinc absolute -left-5 top-35 z-100 cursor-pointer"
        onClick={handlePrev}
      >
        <FaLessThan />
      </button>
      <button
        className="navigator text-black bg-white flex items-center justify-center w-10 h-10  rounded-full border border-zinc absolute -right-5 top-35 z-20 cursor-pointer"
        onClick={handleNext}
      >
        <FaGreaterThan />
      </button>
      <div className="text-2xl font-semibold">Featured</div>
      <div className={` featuredSongs  w-247  flex items-center overflow-x-scroll scrollbar-none  `} onMouseEnter={()=> setIsHoverd(true)} onMouseLeave={()=> setIsHoverd(false) } >
        <div
          className="wider flex items-center gap-7 "
          style={{
            transform: `translateX(${-pixelsToscroll * index}px)`,
            transition: "all 1200ms cubic-bezier(0.65, 0.06, 0.14, 0.92) ",
          }}
        >
          <SongMainCard cardRef={cardRef} imageSrc={"../../../../../songCover1.jpg"} alt={"songCoverPic"} content={"Narai Baran de sapalwaar ye waara we na"} />
          <SongMainCard cardRef={cardRef} imageSrc={"../../../../../songCover2.jpg"} alt={"songCoverPic"} content={"Narai Baran de sapalwaar ye waara we na"} />
          <SongMainCard cardRef={cardRef} imageSrc={"../../../../../songCover3.jpg"} alt={"songCoverPic"} content={"Narai Baran de sapalwaar ye waara we na"} />
          <SongMainCard cardRef={cardRef} imageSrc={"../../../../../songCover4.jpg"} alt={"songCoverPic"} content={"Narai Baran de sapalwaar ye waara we na"} />

        
        </div>
      </div>
    </div>
  );
}

export default Featured;
