import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import usersService from "../../services/users.service";

function Register() {
  const [hidePassword, setHidePassword] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [coverPicName, setCoverPicName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const coverPicInputRef = useRef();
  const formSubmitHandler = async (newUser) => {
    try {
      const backRes = await usersService.registerUser(newUser);
      console.log("the backend res = ", backRes);
      document.querySelector("form").reset();
      navigate("/login");
      // return <Navigate to={"/login"} replace /> it only used outside any function, as an alternative to the original return inside a component
    } catch (error) {
      setEmailError(error.response?.data?.error);
      console.log(error.response?.data?.error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formMaker = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const newUser = new FormData(e.currentTarget);
    // const newUser = Object.fromEntries(formData.entries()); Do'nt use it if the form have file inputs
    // console.log("the raw form data ", formData);
    console.log("the complete record ", newUser);
    formSubmitHandler(newUser);
  };

  const validateEmail = (e) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
      setEmailError("Invalid email address");
      return;
    }
    setEmailError("");
  };

  const handlePictureSelect = (e) => {
    const file = e.target?.files[0];
    if (file) {
      setCoverPicName(file.name);
      return;
    }
  };

  return (
    <div className="inset-0 m-auto  flex items-center justify-center ">
      <div className="w-72  flex flex-col gap-3 2xl:text-2xl mobile:w-80 lg:w-92 xl:w-100 2xl:w-142">
        <div className="heading font-semibold text-3xl ">Create an account</div>
        <div className="text-sm">
          Already have an account?
          <NavLink to={"/login"} className={"text-primary"}>
            Sign in
          </NavLink>
        </div>
        <form
          onSubmit={formMaker}
          className="flex flex-col gap-5 justify-start "
        >
          <div className="username flex flex-col gap-1.5">
            <label htmlFor="username" className="text-muted font-light">
              Username
            </label>
            <input
              id="username"
              name="name"
              type="text"
              required
              minLength={3}
              className="outline-muted outline-1 rounded-sm p-1.5 focus:outline-primary"
            />
          </div>
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
              type={hidePassword ? "password" : "text"}
              name="password"
              required
              onInput={(e) => {
                if (e.target.value.length < 6)
                  e.target.setCustomValidity(
                    "paswword must be 6 characters long",
                  );
                else e.target.setCustomValidity("");
              }}
              className="outline-muted outline-1 rounded-sm p-1.5 focus:outline-primary "
            />
            {hidePassword ? (
              <FaRegEyeSlash
                className="absolute top-10 right-2 cursor-pointer "
                onClick={() => setHidePassword(!hidePassword)}
              />
            ) : (
              <IoEyeOutline
                className="absolute top-10 right-2 cursor-pointer "
                onClick={() => setHidePassword(!hidePassword)}
              />
            )}
            {emailError && <span className="text-red-400">{emailError}</span>}
          </div>

          {/* Input for uploading the profile picture */}
          <div
            className={`songUploader p-1 lg:py-1 border-dashed border-2 border-muted  relative cursor-pointer mb-5 hover:border-primary  hover:opacity-60 hover:blur-[0.5px] flex flex-col items-center`}
            onClick={() => coverPicInputRef.current.click()} // coverPicInputRef.current have the input tag, so we are calling the onclick of that input here.
          >
            <img
              src="../../../songCoverPicIdentifier.png"
              alt="profile picture placeholder"
              className="w-6 h-6"
            />
            <div className="text-muted hover:text-foreground">Profile Picture</div>

            <input
              type="file"
              name="profilePic"
              accept="image/*"
              ref={coverPicInputRef} // We're making the reference of this input equal to the reference stored in the coverPicInputRef varibale.
              style={{ display: "none" }}
              onChange={handlePictureSelect}
            />
            <p className={`${coverPicName ? "" : "hidden"} text-primary`}>
              {coverPicName}
            </p>
          </div>
          <button
            type="submit"
            className="text-primary w-fit py-1.5 px-4 border-primary border rounded-sm font-medium cursor-pointer"
          >
            {`${isProcessing ? "Registering..." : "Create Account"}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
