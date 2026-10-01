import Searchbar from "./Searchbar";
import Cart from "./Cart";
import AuthORProfile from "./AuthORProfile";
import UploadSongsBtn from "../ui/UploadSongsBtn";
import { RxHamburgerMenu } from "react-icons/rx";

function Header({ leftNavBarRef }) {
  return (
    <div className="border-b w-screen lg:w-full border-b-partitioner bg-background flex justify-between  px-3 pt-2 pb-1 items-center sticky top-0 z-40 min-w-0 sm:gap-3 sm:px-4  md:pr-8 md:py-2 lg:py-3">
      <div className="flex gap-3 sm:gap-2 lg:gap-5 items-center">
        <RxHamburgerMenu
          className="lg:hidden cursor-pointer"
          onClick={() => (leftNavBarRef.current.style.display = "flex")}
        />
        {/* <img
          src="../../ribbitPlayerLogo.png"
          alt="app logo"
          className="w-8 h-5 sm:w-12 sm:h-8 md:h-12 md:w-20 lg:hidden"
        /> */}
        <Searchbar />
      </div>
      <div className="flex gap-2 justify-between items-center sm:gap-5 md:gap-5">
        {/* <PriButton content={"Songs"} link={"uploadSong"} Icon={<FiUpload strokeWidth={1} size={20}/>} /> */}
        <UploadSongsBtn />
        <Cart />
        <AuthORProfile />
      </div>
    </div>
  );
}

export default Header;
