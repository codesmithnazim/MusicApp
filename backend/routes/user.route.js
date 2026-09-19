import express from "express";
import {
  getAllUsers,
  registerUser,
  logInUser,
  myProfile,
  TopArtists,
  followArtist,
  getProfile
} from "../controllers/user.controller.js";
import { tokenValidator } from "../middlewares/validateToken.js";
import { loadUser } from "../middlewares/loadUser.js";
import uploadAvator from "../middlewares/uploadAvator.js";
import { getUserAllSongs } from "../controllers/song.controller.js";
const usersRouter = express.Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/register", uploadAvator.single("profilePic"), registerUser);
usersRouter.post("/login", logInUser);
usersRouter.get("/get-profile", loadUser, myProfile);
usersRouter.get("/me", tokenValidator, loadUser, myProfile);
usersRouter.get("/top-artists", TopArtists)
usersRouter.post('/follow/:id',   tokenValidator, loadUser,followArtist)
usersRouter.get('/user-songs/:id',  getUserAllSongs)
usersRouter.get("/:id", getProfile);


export { usersRouter };
