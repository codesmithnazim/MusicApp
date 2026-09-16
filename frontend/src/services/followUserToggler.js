import usersService from "./users.service";

const followUserToggler = async (targetArtistId, user, setUser) => {
  try {
    if (user.followings.includes(targetArtistId)) {
      const { success } = await usersService.followArtist(targetArtistId);
      if (success) {
        const index = user.followings.indexOf(targetArtistId);
        console.log("already followed ", index);
        // setUser((curr) => curr.followings.toSpliced(index, 1));
        setUser((curr) => {
          return {
            ...curr,
            followings: [...curr.followings.toSpliced(index, 1)],
          };
        });
        return;
      }
    }
    const { success } = await usersService.followArtist(targetArtistId);

    if (success) {
      setUser((curr) => {
        return {
          ...curr,
          followings: [...curr.followings.concat(targetArtistId)],
        };
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export default followUserToggler;
