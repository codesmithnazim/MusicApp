import SiteBrand from "./SiteBrand";
import "../../App.css";
import BrowseSection from "./BrowseSection";
import MyCollectionSection from "./MyCollectionSection";
import SettingsSection from "./SettingsSection";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div
      className={`w-54 h-screen bg-background sticky overflow-y-scroll scrollbar-none pl-4.5  flex flex-col items-start gap-3 overscroll-y-auto border-r border-r-partitioner`}
    >
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
          to={"/pricing_plans"}
          className={`text-muted font-normal text-sm`}
        >
          Pricing Plans
        </Link>
        <Link to={"/privacy"} className={` text-muted font-normal text-sm`}>
          Privacy
        </Link>
        <Link
          to={"terms_and_conditions"}
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
