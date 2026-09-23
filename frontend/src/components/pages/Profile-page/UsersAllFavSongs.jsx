import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import usersService from "../../../services/users.service";
import NewSongsCards from "../../ui/NewSongsCards";
import { useSongsQueue } from "../../../contexts/songsQueue";

function UsersAllFavSongs() {
  const { id } = useParams();
    const {  setSongsList } = useSongsQueue();

  const { data } = useQuery({
    queryKey: ["profile", id, "favorites"],
    queryFn: () => usersService.getFavoriteSongs(id),
    staleTime: 8 * 60 * 1000,
  });
  const userFavSongs = data?.userFavSongs;
  console.log("users all fav songs ", userFavSongs);

  const songsQueueSetter = (currentSongId) => {
    const currentSongIndex = userFavSongs.findIndex(
      (song) => song.id === currentSongId,
    );
    setSongsList(userFavSongs, currentSongIndex, "userFav-songs-section");
  };

  return (
    <div className=" grid grid-rows-2 grid-cols-5 gap-2">
      {userFavSongs?.map((song) => (
        <NewSongsCards song={song} key={song?.id}  onClick={songsQueueSetter} cardWidth={60} />
      ))}
    </div>
  );
}

export default UsersAllFavSongs;
