import { FaGreaterThan } from 'react-icons/fa6'

function GreatorThanBtn({handleNext}) {
  return (
        <button
        className="navigator text-black bg-white flex items-center justify-center w-10 h-10  rounded-full border border-zinc absolute -right-5 top-35 z-20 cursor-pointer"
        onClick={handleNext}
      >
        <FaGreaterThan />
      </button>
  )
}

export default GreatorThanBtn