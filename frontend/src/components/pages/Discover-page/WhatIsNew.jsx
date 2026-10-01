// import { useState } from "react";
import { memo } from "react";
import songsServis from "../../../services/songs.servis";
import NewSongsCards from "../../ui/NewSongsCards";
import { useQuery } from "@tanstack/react-query";
import { useSongsQueue } from "../../../contexts/songsQueue";

function WhatIsNew() {
  const { songsQueue, currentIndex, setSongsList } = useSongsQueue();

  const { data } = useQuery({
    queryKey: ["new-songs"],
    queryFn: songsServis.newSongs,
    staleTime: 8 * 60 * 1000,
  });

  const latestSongs = data?.latestSongs;

  console.log("the new songs ", latestSongs);

    const songsQueueSetter = (currentSongId) => {
    const currentSongIndex= latestSongs.findIndex(song=> song.id === currentSongId)
    setSongsList(latestSongs,currentSongIndex, "latest-songs-section");
  };

  return (
    <div className="flex flex-col relative transition-all duration-500 ease-in-out gap-1">
      <h1 className="text-xl font-medium">What's New</h1>
      <div className="new-songs-container border-2 border-amber-700 grid gap-2 grid-rows-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-6 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {latestSongs?.map((song) => (
          <NewSongsCards song={song} key={song?.id} onClick={songsQueueSetter} />
        ))}
      </div>
    </div>
  );
}

export default memo(WhatIsNew);
