import usersService from "./users.service";

const followUserToggler = async (
  currentSong,
  completeUserRecord,
  setcompleteUserRecord,
  setIsFollowing,
) => {
  try {
    if (completeUserRecord.followings.includes(currentSong.user)) {
      const { success } = await usersService.followArtist(currentSong?.user);
      if (success) {
        const index = completeUserRecord.followings.indexOf(currentSong?.user);
        console.log("already followed ", index);
        setcompleteUserRecord((curr) => curr.followings.toSpliced(index, 1));
        return setIsFollowing(false);
      }
    }
    const { success } = await usersService.followArtist(currentSong?.user);

    if (success) {
      setcompleteUserRecord((curr) => curr.followings.push(currentSong?.user));
      setIsFollowing(true);
    }
  } catch (error) {
    console.error(error);
  }
};

export default followUserToggler;
