import { User } from "../models/user.model.js";

const loadUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const completeUser = await User.findById(id);
    // res.status(200).json(completeUser)
    req.user = completeUser;
    next();
  } catch (error) {
    next(error);
  }
};

export { loadUser };
