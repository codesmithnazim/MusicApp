import  { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import usersService from "../../services/users.service";

function LogIn() {
  const [hidePassword, setHidePassword] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate= useNavigate()
  const formSubmitHandler = async (user) => {
    try {
      const backRes = await usersService.logInUser(user);
      if(backRes.success){
        console.log("the backend res = ", backRes);
        document.querySelector("form").reset();
        // <NavLink to={`${backRes.redirectTo}`}/>
        // <link rel="stylesheet" href="/" />
        // Navigate(backRes.redirectTo)   
        navigate(backRes.redirectTo)    
      }
    } catch (error) {
      setEmailError(error.response?.data?.error);
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formMaker = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    // console.log("the raw form data ", formData);
    console.log("the complete record ", user);
    formSubmitHandler(user);
  };

  const changePasswordLook = () => {
    document.getElementById("password").getAttribute("type") === "password"
      ? document.getElementById("password").setAttribute("type", "text")
      : document.getElementById("password").setAttribute("type", "password");
    setHidePassword(!hidePassword);
  };

  const validateEmail = (e) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
      setEmailError("Invalid email address");
      return;
    }
    setEmailError("");
  };

  return (
    <div className="w-4/5 h-4/5  flex items-center justify-center ">
      <div className="w-100 flex flex-col gap-3">
        <div className="heading font-semibold text-3xl ">Login as a user</div>
        <div className="text-sm">
          Create new account?
          <NavLink to={"/register"} className={"text-primary"}>
           Register
          </NavLink>
        </div>
        <form
          onSubmit={formMaker}
          className="flex flex-col gap-5 justify-start "
        >
          <div className="email flex flex-col gap-1.5">
            <label htmlFor="email" className="text-muted font-light">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              minLength={11}
              autoComplete="email"
              className="outline-muted outline-1 rounded-sm p-1.5 focus:outline-primary"
              onChange={validateEmail}
            />
          </div>
          <div className="password flex flex-col gap-1.5 relative">
            <label htmlFor="password" className="text-muted font-light">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              onInput={(e)=>{
                if(e.target.value.length< 6)e.target.setCustomValidity("paswword must be 6 characters long")
                  else e.target.setCustomValidity("")
              }}
              className="outline-muted outline-1 rounded-sm p-1.5 focus:outline-primary "
            />
            {hidePassword ? (
              <FaRegEyeSlash
                className="absolute top-10 right-2 cursor-pointer "
                onClick={changePasswordLook}
              />
            ) : (
              <IoEyeOutline
                className="absolute top-10 right-2 cursor-pointer "
                onClick={changePasswordLook}
              />
            )}
            {emailError && <span className="text-red-400">{emailError}</span>}
          </div>
          <button
            type="submit"
            className="text-primary w-fit py-1.5 px-4 border-primary border rounded-sm font-medium cursor-pointer"
          >
            {`${isProcessing ? "Checking..." : "Log In"}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
