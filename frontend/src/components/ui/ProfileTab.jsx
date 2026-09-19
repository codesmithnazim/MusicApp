import { memo } from "react";
import { NavLink } from "react-router-dom";

function ProfileTab({ to, name , id}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative px-4 pt-1 pb-0 font-medium transition-colors duration-200
    ${isActive ? "text-primary" : "text-gray-400 hover:text-primary"}
    after:absolute after:left-1/2 after:-bottom-1
    after:h-0.5 after:-translate-x-1/2
    after:rounded-full after:bg-primary
    after:transition-all after:duration-300
    ${isActive ? "after:w-3/4" : "after:w-0 hover:after:w-1/2"}`
      }
    >
      {name}
    </NavLink>
  );
}

export default memo(ProfileTab);
