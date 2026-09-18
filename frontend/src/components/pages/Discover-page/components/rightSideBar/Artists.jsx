import usersService from "../../../../../services/users.service";
import TopArtistsLinkBtn from "../../../../ui/TopArtistsLinkBtn";
import { useQuery } from "@tanstack/react-query";
function Artists() {
  const { data } = useQuery({
    queryKey: ["top-artists"],
    queryFn: usersService.TopArtists,
    staleTime: 60 * 60 * 1000,
  });
  const topArtists = data?.topArtists;

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
    <div className="w-full  flex flex-col items-center-safe gap-6">
      <h2 className="text-[20px] font-semibold w-fit mx-auto">Top Artists</h2>

      {topArtists &&
        topArtists.map((artist) => {
          return <TopArtistsLinkBtn artist={artist} key={artist?.id} />;
        })}
    </div>
  );
}

export default Artists;
