import { useQuery } from "@tanstack/react-query";
import usersService from "../../../services/users.service";
import { useParams } from "react-router-dom";
import { memo } from "react";
import NewSongsCards from "../../ui/NewSongsCards";

function UsersAllSongs() {
  const { id } = useParams();
  console.log("the id of the interested user ", id);
  const { data } = useQuery({
    queryKey: ["user-all-songs"],
    queryFn: () => usersService.userAllSongs(id),
  });
  const userAllSongs = data?.userAllSongs;
  console.log("users all songs ", userAllSongs);
  return (
    <div className=" grid grid-rows-2 grid-cols-5 gap-2">
      {userAllSongs?.map((song) => (
        <NewSongsCards song={song} key={song?.id} cardWidth={60}  />
      ))}
    </div>
  );
}

export default memo(UsersAllSongs);
