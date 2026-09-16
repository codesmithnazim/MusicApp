import songServise from "./song.servise";

const likeSongToggler = async (currentSong,userFullDetails, setUserFullDetails) => {

    // console.log("the user", currentSong," and the song = ", userFullDetails)
  try {
    if (userFullDetails?.favourites?.includes(currentSong.id)) {
      const { ok } = await songServise.liker(currentSong.id);
      if (ok) {
        const index = userFullDetails.favourites.indexOf(currentSong.id);
        return setUserFullDetails((prev) => {
          return {
            ...prev,
            favourites: [...prev.favourites.toSpliced(index, 1)],
          };
        });
      }
      return;
    }
    const { ok } = await songServise.liker(currentSong.id);
    if (ok) {
      return setUserFullDetails(
        (prev) => {
          return {
            ...prev,
            favourites: [...prev.favourites, currentSong.id],
          };
        },
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export default likeSongToggler;
