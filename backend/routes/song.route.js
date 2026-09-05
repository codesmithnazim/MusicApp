import express from "express";
// import {getAllUsers, registerUser, logInUser, myProfile} from "../controllers/user.controller.js"
import { tokenValidator } from "../middlewares/validateToken.js";
// import { loadUser } from "../middlewares/loadUser.js"
import uploadSong from "../middlewares/uploadSong.js";
// import uploadSongCover from "../middlewares/uploadSongCover.js";
import { songsUploader } from "../controllers/song.controller.js";
const songsRouter = express.Router();

// usersRouter.get("/", getAllUsers)
songsRouter.post(
  "/upload",
  tokenValidator,
  uploadSong.fields([{ name: "songAudio", maxCount:1 }, { name: "songCoverPic" , maxCount: 1, }]),
  songsUploader,
);
// usersRouter.post("/login", logInUser)
// usersRouter.get("/me",tokenValidator,loadUser, myProfile)
// uploadSong.single("songAudio")

export { songsRouter };
