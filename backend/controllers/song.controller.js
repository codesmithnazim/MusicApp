import path from "path";
import { Song } from "../models/song.model.js";
import createFileUpload from "../utils/createFileUpload.js";
import { parseBuffer } from "music-metadata";
import logger from "../utils/logger.js";

// songsRouter.get("/", async (req, res, next) => {
//   try {
//     // res.status(200).json({ message: "Everything is fine" });
//     const mongoRes= await Song.find()
//     res.status(200).json(mongoRes)
//   } catch (error) {
//     logger.error(error);
//     next(error);
//   }
// });

const songsUploader = async (req, res, next) => {
  const { user } = req;
  const { body: songDetails } = req;
  try {
    if (req.files && songDetails) {
      const songFiles = req.files;
      const songFile = songFiles["songAudio"][0];
      const songCoverFile = songFiles["songCoverPic"][0];

      // logger.info(
      //   "details of files uloaded with the song detail form ",
      //   songFile, songCoverFile
      // );
      // Files size cheacker
      if (songFile.size > 20 * 1024 * 1024) {
        return res
          .status(413)
          .json({ error: "Audio file size should be less than 20 MB" });
      }
      if (songCoverFile.size > 8 * 1024 * 1024) {
        return res
          .status(413)
          .json({ error: "Audio Cover Picture size should be less than 8 MB" });
      }

      const songKey = `audioSongs/${user.id}-${crypto.randomUUID()}${path.extname(songFile.originalname)}`;
      const songCoverPicKey = `audioSongsCoverPics/${user.id}-${crypto.randomUUID()}${path.extname(songCoverFile.originalname)}`;
      console.log("Both the generated keys = ", songKey, songCoverPicKey);
      let upload = createFileUpload({ file: songFile, key: songKey });
      await upload.done();
      upload = createFileUpload({ file: songCoverFile, key: songCoverPicKey });
      await upload.done();
      // console.log("the unknwon reponse = ", response);
      const songMetaData = await parseBuffer(songFile?.buffer);
      console.log("the song metadata", songMetaData);
      songDetails.user = user.id;
      songDetails.audioUrl = songKey;
      songDetails.coverUrl = songCoverPicKey;
      songDetails.duration = songMetaData.format.duration;

      const newSong = await Song.create(songDetails);
      console.log("the uploaded song details ", newSong);
      res.status(201).json({song: newSong})
    }
  } catch (error) {
    logger.error(
      "error while uploading song to backblaze and metadata to monogoDB ",
      error.message,
    );
    next(error);
  }
};

export { songsUploader };
// ${Math.floor(sec/60)}:${Math.floor(sec%60)}
