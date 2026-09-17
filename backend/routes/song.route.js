import express from "express";
// import {getAllUsers, registerUser, logInUser, myProfile} from "../controllers/user.controller.js"
import { tokenValidator } from "../middlewares/validateToken.js";
// import { loadUser } from "../middlewares/loadUser.js"
import uploadSong from "../middlewares/uploadSong.js";
// import uploadSongCover from "../middlewares/uploadSongCover.js";
import { songsUploader, getFeaturedSongs , getSong, likesIncrementor , getNewSongs} from "../controllers/song.controller.js";
const songsRouter = express.Router();
import {loadUser} from "../middlewares/loadUser.js"

// usersRouter.get("/", getAllUsers)
songsRouter.post(
  "/upload",
  tokenValidator,
  uploadSong.fields([{ name: "songAudio", maxCount:1 }, { name: "songCoverPic" , maxCount: 1, }]),
  songsUploader,
);

songsRouter.get('/featured-songs', getFeaturedSongs)
songsRouter.get('/new', getNewSongs)
songsRouter.get('/:id', getSong)
songsRouter.patch('/:id',   tokenValidator,loadUser ,likesIncrementor)

export { songsRouter };
