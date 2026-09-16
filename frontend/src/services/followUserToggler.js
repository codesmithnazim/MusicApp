import usersService from "./users.service";

const followUserToggler = async (
  currentSong,
  user,
  setUser,
) => {
  try {
    if (user.followings.includes(currentSong.user)) {
      const { success } = await usersService.followArtist(currentSong?.user);
      if (success) {
        const index = user.followings.indexOf(currentSong?.user);
        console.log("already followed ", index);
        // setUser((curr) => curr.followings.toSpliced(index, 1));
      setUser((curr) =>{return {...curr, followings :[ ...curr.followings.toSpliced(index, 1)]}});
        // return setIsFollowing(false);
        return;
      }
    }
    const { success } = await usersService.followArtist(currentSong?.user);

    if (success) {
      setUser((curr) =>{return {...curr, followings :[...curr.followings.concat(currentSong?.user)]}});
      // setIsFollowing(true);
    }
  } catch (error) {
    console.error(error);
  }
};

export default followUserToggler;
