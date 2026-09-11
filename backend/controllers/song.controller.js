import path from "path";
import { Song } from "../models/song.model.js";
import createFileUpload from "../utils/createFileUpload.js";
import { parseBuffer } from "music-metadata";
import logger from "../utils/logger.js";
import { User } from "../models/user.model.js";
import getSignedFileUrl from "../utils/b2SignedUrl.js"

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
      await User.findByIdAndUpdate(user.id, { $push: { songs: newSong._id } });
      res.status(201).json({ song: newSong });
    }
  } catch (error) {
    logger.error(
      "error while uploading song to backblaze and metadata to monogoDB ",
      error.message,
    );
    next(error);
  }
};

const getFeaturedSongs=async (req, res, next)=>{

  try {
    const featuredSongs= await Song.aggregate([
      {$match: {visibility: "public",status : "approved" }},
      {$addFields: {ageInDays:{$add:[{$divide:[{$subtract:[new Date(), "$createdAt"]}, 24*60*60*1000]}, 2]}}},
      {$addFields: {featuredScore:{$divide:["$ageInDays", {$add:["$plays", {$multiply: [1, 3]}]}]}}},
      {$sort: {featuredScore: -1}},
      {$limit: 12},
      {$project: {title:1,likes:1, description: 1, coverUrl:1, audioUrl: 1, artist:1, ageInDays:1 }}
    ])
    
const optimizedFeatureSongs =await Promise.all(featuredSongs.map(async song=>{
  song.songCover=await getSignedFileUrl(song.coverUrl)
  song.id= song._id
  delete song.coverUrl
  delete song.audioUrl
  delete song.ageInDays
  delete song._id
  return song
}))

    logger.info('the best featured songs of all time =', optimizedFeatureSongs)
    res.status(200).json({featuredSongs: optimizedFeatureSongs})
  } catch (error) {
    next(error)
  }

}



const getSong=async (req, res, next)=>{
  try {
    const {id:wantedSongId}= req.params
    console.log("the id of the song received by the backend = ", wantedSongId )
    const wantedSong= await Song.findById(wantedSongId)
    wantedSong.audioUrl= await getSignedFileUrl(wantedSong.audioUrl)
    res.status(200).json({song: wantedSong})
  } catch (error) {
    logger.error(error)
    next(error)
  }
  
}

export { songsUploader , getFeaturedSongs, getSong};
// ${Math.floor(sec/60)}:${Math.floor(sec%60)}
