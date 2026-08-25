import SiteBrand from "./SiteBrand";
import '../../App.css'
import BrowseSection from "./BrowseSection";
import MyCollectionSection from "./MyCollectionSection";
import SettingsSection from "./SettingsSection";

function Main() {
  return (
    <div className="w-54 min-h-screen bg-white sticky overflow-y-scroll scrollbar-none pl-4.5  flex flex-col items-start gap-3">
      <SiteBrand />
      <div className="text-muted font-light text-sm">Browse</div>
      <BrowseSection />
      <div className="text-muted font-light text-sm">My collection</div>
      <MyCollectionSection/>
      <div className="text-muted font-light text-sm">Settings</div>
      <SettingsSection/>
    </div>
  )
}

export default Main;
