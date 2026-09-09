import { useEffect, useState } from "react";

import usersService from "../../../../../services/users.service";
import { useThemeContext } from "../../../../../contexts/ThemeProvider";
import TopArtistsLinkBtn from "../../../../ui/TopArtistsLinkBtn";
function Artists() {
  const { isDark } = useThemeContext();
  const [bestArtists, setBestArtists] = useState("");
  useEffect(() => {
    const getTopArtists = async () => {
      try {
        const { topArtists } = await usersService.TopArtists();
        console.log(
          "the top five artist receive from the backend ",
          topArtists,
        );
        setBestArtists(topArtists);
      } catch (error) {
        console.log("error message while fetching top artists ", error.message);
      }
    };
    getTopArtists();
    return () => {};
  }, []);

  return (
    <div className="w-full  flex flex-col items-center-safe gap-6">
      <h2 className="text-[20px] font-semibold w-fit mx-auto">Top Artists</h2>

      {bestArtists &&
        bestArtists.map((artist) => {
          return <TopArtistsLinkBtn artist={artist} key={artist?.id}/>;
        })}
      {/* <Link
        to={"something-good"}
        className={`${isDark? "dark":""} flex justify-center items-center gap-2`}
      >
        <img
          src="https://avators.s3.us-east-005.backblazeb2.com/avators/6a9c57278e353cea896695d8-1788630823830.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=005c7dec002d96a0000000002%2F20260906%2Fus-east-005%2Fs3%2Faws4_request&X-Amz-Date=20260906T042000Z&X-Amz-Expires=3600&X-Amz-Signature=d04683540adb30b1cefc55a783468db6f368cc85fe8a0c39bfe8e27a6278b725&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
          alt="profile pciture"
          className="w-10 h-10 rounded-full object-cover object-top-right"
        />
        <div className="flex gap-3">
          <div className={`${isDark? "dark":""} info flex flex-col`}>
            <span className="text-foreground">Aakif Javeed</span>
            <div className="flex gap-2">
           <span className={`${isDark? "dark":""} flex items-center justify-center w-fit text-muted`}><MdPerson2 /> 0</span>
           <span className={`${isDark? "dark":""} flex items-center justify-center w-fit text-muted`}><IoPlaySharp /> 0</span>
            </div>
          </div>
          <button
            className={`${isDark ? "dark" : ""} px-4 py-1 tracking-wider h-fit w-fit bg-primary rounded-sm text-sm text-white self-end-safe`}
          >
            follow
          </button>
        </div>
      </Link>
      <Link
        to={"something-good"}
        className={`${isDark? "dark":""} flex justify-center items-center gap-2`}
      >
        <img
          src="https://avators.s3.us-east-005.backblazeb2.com/avators/6a9c57278e353cea896695d8-1788630823830.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=005c7dec002d96a0000000002%2F20260906%2Fus-east-005%2Fs3%2Faws4_request&X-Amz-Date=20260906T042000Z&X-Amz-Expires=3600&X-Amz-Signature=d04683540adb30b1cefc55a783468db6f368cc85fe8a0c39bfe8e27a6278b725&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
          alt="profile pciture"
          className="w-10 h-10 rounded-full object-cover object-top-right"
        />
        <div className="flex gap-3">
          <div className={`${isDark? "dark":""} info flex flex-col`}>
            <span className="text-foreground">Aakif Javeed</span>
            <div className="flex gap-2">
           <span className={`${isDark? "dark":""} flex items-center justify-center w-fit text-muted`}><MdPerson2 /> 0</span>
           <span className={`${isDark? "dark":""} flex items-center justify-center w-fit text-muted`}><IoPlaySharp /> 0</span>
            </div>
          </div>
          <button
            className={`${isDark ? "dark" : ""} px-4 py-1 tracking-wider h-fit w-fit bg-primary rounded-sm text-sm text-white self-end-safe`}
          >
            follow
          </button>
        </div>
      </Link> */}
    </div>
  );
}

export default Artists;
