import { NavLink } from "react-router-dom";
function AuthenticatingButtons() {
  return (
    <div className="flex gap-2">
      <NavLink
        to={"login"}
        className={`text-foreground w-fit py-1 px-2 rounded-sm `}
      >
        Login
      </NavLink>
      <NavLink
        to={"register"}
        className={` text-white flex items-center w-fit bg-primary  px-2 rounded-sm`}
      >
        Sign up
      </NavLink>
    </div>
  );
}

export default AuthenticatingButtons;
