import { Link } from "react-router-dom";
import { MdPerson2 } from "react-icons/md";
import { IoPlaySharp } from "react-icons/io5";
import Avator from "../utils/Avator";
import FollowButton from "./FollowButton";

function TopArtistsLinkBtn({ artist }) {
  return (
    <Link
      to={`/user/${artist?.details?.id}/songs`}
      // to={`/user/${artist.details.name.toLowerCase().replaceAll(" ", "-")}`}
      className={`w-full flex  items-center  border border-yellow-300 justify-start gap-5`}
    >
      <Avator user={artist} />
      <div className="flex flex-1 justify-between">
        <div
          className={`info flex flex-col overflow-clip text-[13px] font-medium`}
        >
          <span className="text-foreground ">{artist?.details?.name || 0 }</span>
          <div className="flex gap-2">
            <span
              className={`flex items-center justify-center w-fit text-muted`}
            >
              <MdPerson2 /> {artist?.details.followers.length  || 0}
            </span>
            <span
              className={` flex items-center justify-center w-fit text-muted`}
            >
              <IoPlaySharp /> {artist?.totalPlays || 0}
            </span>
          </div>
        </div>
        <FollowButton artist={artist} />
      </div>
    </Link>
  );
}

export default TopArtistsLinkBtn;
