import { Music2, Play, Heart } from "lucide-react";
import { Link } from "react-router-dom";

function FollowerCard({ follower }) {
  const { name, profilePicture, plays, likes, totalSongs, id } = follower;

  return (
    <>
    <Link 
    to={`/user/${id}/songs`}
      className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-4 w-fit pr-5
                 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200
                 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
    >
      {/* Avatar with brand gradient ring */}
      <div className="relative shrink-0  rounded-full bg-linear-to-br from-violet-500 via-pink-500 to-orange-400 p-0.5">
        <div className="rounded-full bg-white p-0.5">
          <img
            src={profilePicture}
            alt={name}
            className="h-14 w-14 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Name + stats */}
      <div className=" flex-1 px-2">
        <h3 className="truncate text-[15px] font-semibold text-zinc-900">
          {name}
        </h3>

        <div className="mt-1.5 flex items-center gap-5 text-xs font-medium text-zinc-500">
          <span className="flex flex-col items-center">
            {totalSongs}
            <span className="flex ">
              <Music2 className="h-3.5 w-3.5 text-zinc-400" />
              songs
            </span>
          </span>
          <span className="flex flex-col items-center">
            {plays}
            <span className="flex gap-1">
              <Play className="h-3.5 w-3.5 text-zinc-400" />
              plays
            </span>
          </span>
          <span className="flex flex-col items-center">
            {likes}
            <span className="flex gap-1">
              <Heart className="h-3.5 w-3.5 text-zinc-400" />
              likes
            </span>
          </span>
          
        </div>
      </div>

 
    </Link>
    </>
  );
}

export default FollowerCard;
