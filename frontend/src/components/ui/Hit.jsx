import songservice from "../../services/song.servise";
import { useQuery } from "@tanstack/react-query";
import { IoPlaySharp } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";

function Hit({ hit, onClick , setSearchedSongs}) {
  const { data } = useQuery({
    queryKey: ["song-cover", hit?.objectID],
    queryFn: () => songservice.getSongCover(hit?.objectID),
    staleTime: 20 * 60 * 1000,
    enabled: !!hit?.objectID, // don't fire until objectID exists
  });

  const songCover = data?.songCover;

  //   setSongCover(songCover);

  return (
    <li
      className=" relative flex h-22 z-50 w-full gap-3 items-start border-2 cursor-pointer border-black/30 hover:border-primary bg-background p-2  rounded-lg shadow-lg"
      onClick={() =>{ onClick(hit?.objectID);setSearchedSongs([]) }}
      key={hit?.objectID}
    >
      {songCover && (
        <img
          src={songCover}
          alt={hit?.title}
          className="object-cover w-20 h-12 rounded-md self-start"
        />
      )}
      <div className="titleAndDesc flex-1 flex flex-col gap-1">
        <div className="title text-foreground text-[18px] font-medium leading-3">
          {hit?.title.length > 25
            ? hit?.title.slice(0, 22).concat("...")
            : hit?.title}
        </div>
        <div className="artist text-muted text-xs ">
          {hit?.artist.length > 17
            ? hit?.artist.slice(0, 14).concat("...")
            : hit?.artist}
        </div>
        <div className="description text-muted text-xs">
          {hit?.description.length > 103
            ? hit?.description.slice(0, 100).concat("...")
            : hit?.description}
        </div>
      </div>
      <div className="flex gap-1 text-muted text-xs self-center">
        <span>
          <IoPlaySharp /> {hit?.plays || 0}{" "}
        </span>
        <span>
          <IoHeart /> {hit?.likes || 0}
        </span>
      </div>
    </li>
  );
}

export default Hit;
