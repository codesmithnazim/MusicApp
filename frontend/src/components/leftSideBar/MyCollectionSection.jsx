import PriButton from "../ui/PriButton";
import { RiPlayListLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { useAuth } from "../../contexts/AuthProvider";

function MyCollectionSection() {
  const {user}= useAuth()
  return (
    <div className="flex flex-col gap-1 pb-2">
      <PriButton content={"Playlists"} link={"playlists"} Icon={<RiPlayListLine strokeWidth={0} size={20}/>} />
      <PriButton content={"Likes"} link={`/user/${user?.id}/likes`} Icon={<CiHeart strokeWidth={.5} size={20}/>} />
    </div>
  );
}

export default MyCollectionSection;
