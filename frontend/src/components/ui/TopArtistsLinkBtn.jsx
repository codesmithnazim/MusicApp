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
      className={` flex  items-center  border border-yellow-300 justify-start gap-2 text-[10px] sm:text-sm md:text-base md:gap-5 lg:text-sm lg:w-full lg:gap-3`}
    >
      <Avator user={artist} />
      <div className="flex flex-1 justify-between">
        <div
          className={`info flex flex-col overflow-clip  font-medium`}
        >
          <span className="text-foreground leading-3.5">{artist?.details?.name  }</span>
          <div className="flex gap-1 ">
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
