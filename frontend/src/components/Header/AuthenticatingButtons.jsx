import { NavLink } from "react-router-dom";
function AuthenticatingButtons() {
  return (
    <div className="flex  text-[8px] gap-1 item-center sm:text-sm sm:gap-2 lg:text-base lg:gap-3">
      <NavLink
        to={"login"}
        className={`inline-block text-foreground w-fit py-0.5 px-1 rounded-sm `}
      >
        Login
      </NavLink>
      <NavLink
        to={"register"}
        className={` text-white flex items-center w-fit bg-primary leading-0  px-1 rounded-sm lg:px-2`}
      >
        Sign up
      </NavLink>
    </div>
  );
}

export default AuthenticatingButtons;
