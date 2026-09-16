import songServise from "./song.servise";

const likeSongToggler = async (currentSong, user, setUser) => {
  // console.log("the user", currentSong," and the song = ", userFullDetails)
  try {
    if (user?.favourites?.includes(currentSong.id)) {
      const { ok } = await songServise.liker(currentSong.id);
      if (ok) {
        const index = user.favourites.indexOf(currentSong.id);
        return setUser((prev) => {
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
      return setUser((prev) => {
        return {
          ...prev,
          favourites: [...prev.favourites.concat(currentSong.id)], //here we can it directly through [,] but it is safe method.
        };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export default likeSongToggler;
