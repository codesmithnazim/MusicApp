import { FaLessThan } from "react-icons/fa6";

function LessThanBtn({ handlePrev }) {
  return (
    <button
      className="navigator text-black bg-white w-10 h-10 flex justify-center items-center rounded-full border border-zinc absolute -left-5 top-35 z-100 cursor-pointer"
      onClick={()=>handlePrev()}
    >
      <FaLessThan />
    </button>
  );
}

export default LessThanBtn;
