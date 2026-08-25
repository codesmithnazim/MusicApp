import { NavLink } from "react-router-dom";
function MainButton({ content,Icon}) {
  return (
    <NavLink
      to={`${content==='Discover' && ''}`}
      className={({ isActive }) =>
        `flex justify-start items-center gap-2 py-1 px-2 rounded-md text-[12px] font-medium transition-colors w-41 ${
          isActive
            ? "bg-pink-600 text-white"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      {Icon}
      {content}
    </NavLink>
  )
}

export default MainButton;
