import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaAlgolia } from "react-icons/fa6";
import searchClient from "../../configs/searchClient";
import Hit from "../ui/Hit";
import { useSongsQueue } from "../../contexts/songsQueue";

function Searchbar() {
  const [query, setQuery] = useState("");
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [paginationArray, setPaginationArray] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { setSongsList } = useSongsQueue();
  const [currPage, setCurrPage] = useState(0);

  const runSearch = async (page = 0) => {
    const { results } = await searchClient.search([
      { indexName: "songs", query, params: { hitsPerPage: 5, page } },
    ]);
    if (results) {
      const totalPages = results[0]?.nbPages;
      setCurrPage(results[0]?.page);
      if (totalPages) {
        setPaginationArray(Array.from({ length: totalPages }, (_, i) => i));
      }

      setSearchedSongs(
        results[0]?.hits.map((song) => {
          return { ...song, id: song?.objectID };
        }),
      );
      console.log("searched songs =", results);
      setIsSearching(false);
    }
  };
  useEffect(() => {
    if (!query){
      setIsSearching(false)
       return setSearchedSongs([]);
}
    setIsSearching(true);
    const timer = setTimeout(async () => {
      await runSearch();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const songsQueueSetter = (currentSongId) => {
    const currentSongIndex = searchedSongs.findIndex(
      (song) => song?.objectID === currentSongId,
    );
    setSongsList(searchedSongs, currentSongIndex, "searched-songs");
  };

  document.querySelector("body").addEventListener("click", () => {
    setQuery("");
  });

  return (
    <div
      className={`relative searchBar flex items-center gap-3 h-7 w-120 p-5 bg-sbBackground backdrop-blur-lg  border-white/20 rounded-lg z-50`}
      onClick={(e) => e.stopPropagation()}
    >
      <CiSearch size={24} className={` text-foreground`} />
      <input
        className={`flex-1 outline-none placeholder:text-muted placeholder:italic`}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {isSearching && (
        <AiOutlineLoading3Quarters size={17} className="animate-spin" />
      )}
      <FaAlgolia className="text-muted" />
      {searchedSongs?.length > 0 && (
        <ul className="absolute flex flex-col top-full w-full left-0 mt-2 bg-foreground gap-2 p-3 rounded-md">
          {searchedSongs.map((hit) => (
            <Hit hit={hit} key={hit?.objectID} onClick={songsQueueSetter} setSearchedSongs={setSearchedSongs} />
          ))}
          <div className="pagination flex gap-4 items-center m-auto w-fit mt-0.5">
            {paginationArray.length > 1 &&
              paginationArray.map((page) => (
                <div
                  className={`w-5 h-5 text-center leading-[100%] rounded-full mt-2 text-background border border-background cursor-pointer
                    ${page === currPage && "underline decoration-primary"}
                    `}
                  onClick={() => runSearch(page)}
                >
                  {page + 1}
                </div>
              ))}
          </div>
          <div className="flex items-center justify-end gap-1.5 px-4 py-2 border-t border-white/10 text-[11px] text-gray-400">
            <span>Search by</span>
            <FaAlgolia />
            <span className="font-semibold text-gray-300">Algolia</span>
          </div>
        </ul>
      )}
    </div>
  );
}

export default Searchbar;
