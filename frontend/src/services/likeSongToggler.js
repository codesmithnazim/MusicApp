import songServise from "./song.servise";

const likeSongToggler = async (targetSongId, user, setUser) => {
  // console.log("the user", targetSongId," and the song = ", userFullDetails)
  try {
    if (user?.favourites?.includes(targetSongId)) {
      const { ok } = await songServise.liker(targetSongId);
      if (ok) {
        const index = user.favourites.indexOf(targetSongId);
        return setUser((prev) => {
          return {
            ...prev,
            favourites: [...prev.favourites.toSpliced(index, 1)],
          };
        });
      }
      return;
    }
    const { ok } = await songServise.liker(targetSongId);
    if (ok) {
      return setUser((prev) => {
        return {
          ...prev,
          favourites: [...prev.favourites.concat(targetSongId)], //here we can it directly through [,] but it is safe method.
        };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export default likeSongToggler;
