import Searchbar from "./Searchbar";
import Cart from "./Cart";
import AuthORProfile from "./AuthORProfile";
import UploadSongsBtn from "../ui/UploadSongsBtn";

function Header() {
  return (
    <div className="border-b border-b-partitioner bg-background flex justify-between px-10 py-3 items-center sticky top-0 z-50">
      {/* <div className={`${isDark? "dark":""} border-b border-b-muted flex justify-between px-10 py-3`}> */}
      <Searchbar />
      <div className="flex gap-5 justify-between items-center">
        {/* <PriButton content={"Songs"} link={"uploadSong"} Icon={<FiUpload strokeWidth={1} size={20}/>} /> */}
        <UploadSongsBtn/>
        <Cart />
        <AuthORProfile />
      </div>
    </div>
  );
}

export default Header;
