import Searchbar from "./Searchbar";
import Cart from "./Cart";
import AuthORProfile from "./AuthORProfile";
import UploadSongsBtn from "../ui/UploadSongsBtn";

function Header() {
  return (
    <div className="border-b w-screen lg:w-full border-b-partitioner bg-background flex justify-between gap-2 px-1 pt-2 items-center sticky top-0 z-50 min-w-0 sm:gap-3 sm:px-4 md:pr-8">
      <div className="flex sm:gap-2 lg:gap-5">
    <img src="../../ribbitPlayerLogo.png" alt="app logo" className="w-8 h-5 sm:w-12 sm:h-8 md:hidden" />
      <Searchbar />
      </div>
      <div className="flex gap-2 justify-between items-center sm:gap-5 md:gap-5">
        {/* <PriButton content={"Songs"} link={"uploadSong"} Icon={<FiUpload strokeWidth={1} size={20}/>} /> */}
        <UploadSongsBtn/>
        <Cart />
        <AuthORProfile />
      </div>
    </div>
  );
}

export default Header;
