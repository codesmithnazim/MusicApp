import { useQuery } from "@tanstack/react-query";
import usersService from "../../../services/users.service";
import { useParams } from "react-router-dom";
import { memo } from "react";
import NewSongsCards from "../../ui/NewSongsCards";
import { useSongsQueue } from "../../../contexts/songsQueue";

function UsersAllSongs() {
  const { id } = useParams();
  const {  setSongsList } = useSongsQueue();

  console.log("the id of the interested user ", id);
  const { data } = useQuery({
    queryKey: ["profile", id, "songs"],
    queryFn: () => usersService.userAllSongs(id),
    staleTime: 8 * 60 * 1000,
  });
  const userAllSongs = data?.userAllSongs;
  console.log("users all songs ", userAllSongs);

  const songsQueueSetter = (currentSongId) => {
    const currentSongIndex = userAllSongs.findIndex(
      (song) => song.id === currentSongId,
    );
    setSongsList(userAllSongs, currentSongIndex, "userAll-songs-section");
  };

  return (
    <div className=" grid grid-rows-2 grid-cols-5 gap-2">
      {userAllSongs?.map((song) => (
        <NewSongsCards song={song} key={song?.id}  onClick={songsQueueSetter} cardWidth={60} />
      ))}
    </div>
  );
}

export default memo(UsersAllSongs);
