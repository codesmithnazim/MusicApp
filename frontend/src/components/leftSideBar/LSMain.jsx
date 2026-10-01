import SiteBrand from "./SiteBrand";
import "../../App.css";
import BrowseSection from "./BrowseSection";
import MyCollectionSection from "./MyCollectionSection";
import { RxCross2 } from "react-icons/rx";
import SettingsSection from "./SettingsSection";
import { Link } from "react-router-dom";

function Main({ leftNavBarRef }) {
  return (
    <div
      className={`w-54 h-screen hidden absolute bg-background  top-0 overflow-y-scroll scrollbar-none pl-4.5 p-1 flex-col items-start gap-2 overscroll-y-auto border-r border-r-partitioner shrink-0 z-50  lg:flex lg:sticky`}
      ref={leftNavBarRef}
    >
      <RxCross2 className="absolute top-4 left-46 cursor-pointer lg:hidden"  onClick={()=>leftNavBarRef.current.style.display="none" }/>
      <SiteBrand />
      <div className={`text-muted font-normal text-sm`}>Browse</div>
      <BrowseSection />
      <div className={` text-muted font-normal text-sm`}>My collection</div>
      <MyCollectionSection />
      <div className={` text-muted font-normal text-sm`}>Settings</div>
      <SettingsSection />
      <div className="additionals grid grid-cols-[70px_100px] justify-center pb-3">
        <Link to={"/blogs"} className={`text-muted font-normal text-sm`}>
          Blogs
        </Link>
        <Link
          to={"/pricing-plans"}
          className={`text-muted font-normal text-sm`}
        >
          Pricing Plans
        </Link>
        <Link to={"/privacy"} className={` text-muted font-normal text-sm`}>
          Privacy
        </Link>
        <Link
          to={"terms-and-conditions"}
          className={`text-muted font-normal text-sm`}
        >
          Terms
        </Link>
      </div>
      <div className={` text-muted font-normal text-sm`}>
        Ribbit Music. Made with ❤ <br></br> by CodeSmithNazim{" "}
      </div>
    </div>
  );
}

export default Main;
