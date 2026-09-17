// import { useState } from "react"; 
import { memo } from "react";
import songsServis from "../../../services/songs.servis";
import NewSongsCards from "../../ui/NewSongsCards";
import { useQuery } from "@tanstack/react-query";

function WhatIsNew() {
  // const [newSongs, setNewSongs] = useState([]);

  const { data: {latestSongs} } = useQuery({
    queryKey: ["new-songs"],
    queryFn: songsServis.newSongs,
    staleTime: 5 * 60 * 1000,
  });

  console.log("the new songs ", latestSongs)


  return (
    <div className="flex flex-col relative transition-all duration-500 ease-in-out gap-1">
      <h1 className="text-xl font-medium">What's New</h1>
      <div className="new-songs-container grid grid-rows-2 grid-cols-5 gap-2">
        {latestSongs?.map((song) => (
          <NewSongsCards song={song} />
        ))}
      </div>
    </div>
  );
}

export default memo(WhatIsNew);
