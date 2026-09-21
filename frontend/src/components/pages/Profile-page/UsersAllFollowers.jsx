import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import usersService from "../../../services/users.service";
import FollowerCard from "../../ui/FollowerCard";

function UsersAllFollowers() {
  const { id } = useParams();
  console.log("the id of the interested user ", id);

  const { data } = useQuery({
    queryKey: ["profile", id, "followers"],
    queryFn: () => usersService.userAllFollowers(id),
    staleTime: 8 * 60 * 1000,
  });
  const userAllFollowers = data?.userAllFollowers;
  console.log("users all followers ", userAllFollowers);
  return (
    <div className=" grid grid-rows-2 grid-cols-4 gap-5 p-2">
      {userAllFollowers?.map((user) => (
        <FollowerCard follower={user} key={user?.id}  />
      ))}
    </div>
  );
}

export default UsersAllFollowers;
