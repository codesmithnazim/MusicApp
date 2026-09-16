import { Link } from "react-router-dom";
import { MdPerson2 } from "react-icons/md";
import { IoPlaySharp } from "react-icons/io5";
import Avator from "../utils/Avator";
import FollowButton from "./FollowButton";

function TopArtistsLinkBtn({ artist }) {
  return (
    <Link
      to={"something-good"}
      className={` w-full flex justify-between items-center `}
    >
      <Avator user={artist} />
      <div className="flex gap-3 ">
        <div
          className={`info flex flex-col w-25 overflow-clip text-[13px] font-medium`}
        >
          <span className="text-foreground ">{artist?.details?.name}</span>
          <div className="flex gap-2">
            <span
              className={`flex items-center justify-center w-fit text-muted`}
            >
              <MdPerson2 /> {artist?.details.followers.length}
            </span>
            <span
              className={` flex items-center justify-center w-fit text-muted`}
            >
              <IoPlaySharp /> {artist?.totalPlays}
            </span>
          </div>
        </div>
        <FollowButton artist={artist} />
      </div>
    </Link>
  );
}

export default TopArtistsLinkBtn;
