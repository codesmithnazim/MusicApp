import express from "express";
import {
  getAllUsers,
  registerUser,
  logInUser,
  myProfile,
  TopArtists,
  followArtist,
  getUser
} from "../controllers/user.controller.js";
import { tokenValidator } from "../middlewares/validateToken.js";
import { loadUser } from "../middlewares/loadUser.js";
import uploadAvator from "../middlewares/uploadAvator.js";
const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/register", uploadAvator.single("profilePic"), registerUser);
usersRouter.post("/login", logInUser);
usersRouter.get("/me", tokenValidator, loadUser, myProfile);
usersRouter.get("/top-artists", TopArtists)
usersRouter.post('/follow/:id',   tokenValidator, loadUser,followArtist)
usersRouter.get("/:id", getUser);


export { usersRouter };
