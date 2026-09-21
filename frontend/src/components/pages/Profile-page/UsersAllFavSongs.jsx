import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import usersService from "../../../services/users.service";
import NewSongsCards from "../../ui/NewSongsCards";

function UsersAllFavSongs() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ["profile", id, "favorites"],
    queryFn: () => usersService.getFavoriteSongs(id),
    staleTime: 8 * 60 * 1000,
  });
  const userFavSongs = data?.userFavSongs;
  console.log("users all songs ", userFavSongs);
  return (
    <div className=" grid grid-rows-2 grid-cols-5 gap-2">
      {userFavSongs?.map((song) => (
        <NewSongsCards song={song} key={song?.id} cardWidth={60} />
      ))}
    </div>
  );
}

export default UsersAllFavSongs;
