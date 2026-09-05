import { useEffect } from "react";
import { Link } from "react-router-dom";
import usersService from "../../services/users.service";
function Artists() {
  useEffect(() => {
    const getTopArtists = async () => {
      try {
        const {topArtists} = await usersService.TopArtists();
        console.log('the top five artist receive from the backend ',topArtists)
      } catch (error) {
        console.log("error message while fetching top artists ", error.message);
      }
    };
    getTopArtists();
    return () => {};
  }, []);

  return (
    <div>
      <h2 className="text-[20px] font-semibold w-fit mx-auto">Top Artists</h2>
      <Link to={"someyhing-good"}></Link>
    </div>
  );
}

export default Artists;
