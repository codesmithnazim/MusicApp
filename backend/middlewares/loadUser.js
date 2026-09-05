import { User } from "../models/user.model.js";
import getSignedFileUrl from "../utils/b2SignedUrl.js";

const loadUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const completeUser = await User.findById(id);
    if (completeUser.profilePicture) {
      completeUser.profilePicture =
        (await getSignedFileUrl(completeUser.profilePicture)) ||
        completeUser.profilePicture;
    }
    // res.status(200).json(completeUser)
    req.user = completeUser;
    next();
  } catch (error) {
    next(error);
  }
};

export { loadUser };
