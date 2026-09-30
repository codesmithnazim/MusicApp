import { useAuth } from "../../../../../contexts/AuthProvider";
import usersService from "../../../../../services/users.service";
import TopArtistsLinkBtn from "../../../../ui/TopArtistsLinkBtn";
import { useQuery } from "@tanstack/react-query";
function Artists() {
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["top-artists"],
    queryFn: usersService.TopArtists,
    staleTime: 60 * 60 * 1000,
  });
  const topArtists = data?.topArtists;
  // const {topArtists} = data;

  // useEffect(() => {
  //   const getTopArtists = async () => {
  //     try {
  //       const { topArtists } = await (usersService.TopArtists);
  //       console.log(
  //         "the top five artist receive from the backend ",
  //         topArtists,
  //       );
  //       setBestArtists(topArtists);
  //     } catch (error) {
  //       console.log("error message while fetching top artists ", error.message);
  //     }
  //   };
  //   getTopArtists();
  //   return () => {};
  // }, []);

  return (
    <>
      <h2 className="text-[20px] font-semibold w-fit mx-auto">Top Artists</h2>
      <div className="w-screen border border-red-800 gap-8 p-8 h-fit grid grid-cols-2 md:grid-cols-3 md:grid-rows-3 ">
        {topArtists &&
          topArtists?.map((artist) => {
            if (artist?.id === user?.id)
              artist = { ...artist, profilePicture: user.profilePicture };
            return <TopArtistsLinkBtn artist={artist} key={artist?.id} />;
          })}
      </div>
    </>
  );
}

export default Artists;

// items-center-safe