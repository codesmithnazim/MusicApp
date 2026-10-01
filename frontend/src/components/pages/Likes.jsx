import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import UsersAllFavSongs from "./Profile-page/UsersAllFavSongs";

function Likes() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={`/login`} replace />;
  }
  return (
    <div className="flex flex-col gap-5 p-3 md:gap-8  md:p-5" >
      <h1 className="font-bold text-[18px] ">Songs That You Have Liked</h1>
      <UsersAllFavSongs />
    </div>
  );
}

export default Likes;
