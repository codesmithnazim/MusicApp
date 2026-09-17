import path from "path";
import { Song } from "../models/song.model.js";
import createFileUpload from "../utils/createFileUpload.js";
import { parseBuffer } from "music-metadata";
import logger from "../utils/logger.js";
import { User } from "../models/user.model.js";
import getSignedFileUrl from "../utils/b2SignedUrl.js";
import playQueue from "../queues/play.queue.js";
import sharp from "sharp";

const songsUploader = async (req, res, next) => {
  const { user } = req;
  const { body: songDetails } = req;
  try {
    if (req.files && songDetails) {
      const songFiles = req.files;
      const songFile = songFiles["songAudio"][0];
      const songCoverFile = songFiles["songCoverPic"][0];

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

      const customisedSongCoverBuffer = await sharp(songCoverFile.buffer)
        .resize(450)
        .webp({ quality: 80 })
        .toBuffer();
      songCoverFile.buffer = customisedSongCoverBuffer;

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

const getFeaturedSongs = async (req, res, next) => {
  try {
    const featuredSongs = await Song.aggregate([
      { $match: { visibility: "public", status: "approved" } },
      {
        $addFields: {
          ageInDays: {
            $add: [
              {
                $divide: [
                  { $subtract: [new Date(), "$createdAt"] },
                  24 * 60 * 60 * 1000,
                ],
              },
              2,
            ],
          },
        },
      },
      {
        $addFields: {
          featuredScore: {
            $divide: [
              "$ageInDays",
              { $add: ["$plays", { $multiply: [1, 3] }] },
            ],
          },
        },
      },
      { $sort: { featuredScore: -1 } },
      { $limit: 12 },
      {
        $project: {
          title: 1,
          likes: 1,
          plays: 1,
          description: 1,
          coverUrl: 1,
          audioUrl: 1,
          artist: 1,
          ageInDays: 1,
        },
      },
    ]);

    const optimizedFeatureSongs = await Promise.all(
      featuredSongs.map(async (song) => {
        song.songCover = await getSignedFileUrl(song.coverUrl);
        song.id = song._id;
        delete song.coverUrl;
        delete song.audioUrl;
        delete song.ageInDays;
        delete song._id;
        return song;
      }),
    );

    logger.info("the best featured songs of all time =", optimizedFeatureSongs);
    res.status(200).json({ featuredSongs: optimizedFeatureSongs });
  } catch (error) {
    next(error);
  }
};

const getSong = async (req, res, next) => {
  try {
    const { id: wantedSongId } = req.params;
    logger.info("the id of the song received by the backend = ", wantedSongId);
    const wantedSong = await Song.findById(wantedSongId);
    wantedSong.audioUrl = await getSignedFileUrl(wantedSong.audioUrl);
    wantedSong.coverUrl = await getSignedFileUrl(wantedSong.coverUrl);
    await playQueue.add("record-play", {
      eventId: crypto.randomUUID(),
      songId: wantedSong?._id,
      userId: wantedSong?.user,
      playedAt: new Date().toISOString(),
    });
    res.status(200).json({ song: wantedSong });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

const likesIncrementor = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  // console.log("the current user ", user)
  try {
    const completeSongDetails = await Song.findById(id);
    if (user.favourites.includes(id)) {
      await User.findByIdAndUpdate(
        user._id,
        { $pull: { favourites: id } },
        { returnDocument: "after" },
      );
      await User.findByIdAndUpdate(
        completeSongDetails.user,
        { $inc: { likes: -1 } },
        { returnDocument: "after" },
      );
      await Song.findByIdAndUpdate(
        id,
        { $pull: { likes: user._id } },
        { returnDocument: "after" },
      );
      return res.status(201).json({ ok: true });
    }
    const updatedSongs = await Song.findByIdAndUpdate(
      id,
      { $push: { likes: user._id } },
      { returnDocument: "after" },
    );
    const favouritesUpdated = await User.findByIdAndUpdate(
      user._id,
      { $push: { favourites: id } },
      { returnDocument: "after" },
    );
    await User.findByIdAndUpdate(
      completeSongDetails.user,
      { $inc: { likes: 1 } },
      { returnDocument: "after" },
    );

    console.log("The updated songs = ", updatedSongs);
    console.log("the favouritesUpdated = ", favouritesUpdated);
    res.status(200).json({ ok: true });
  } catch (error) {
    next(error);
  }
};

const getNewSongs = async (req, res, next) => {
  console.log("Control of execution came in song.controller.js ")
  try {
    let newSongs = await Song.aggregate([
      { $match: { visibility: "public", status: "approved" } },
      {
        $project: {
          id: "$_id",
          _id : 0,
          title: 1,
          artist: 1,
          user: 1,
          plays: 1,
          likes: 1,
          coverUrl: 1,
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
    ]);

     newSongs =await  Promise.all(newSongs.map(async song=>{
     song.songCover = await getSignedFileUrl(song.coverUrl);
     delete song.coverUrl
      return song
    }))
    console.log("new latest songs ", newSongs)
    res.status(200).json({latestSongs: newSongs})
  } catch (error) {
    next(error);
  }
};

export {
  songsUploader,
  getFeaturedSongs,
  getSong,
  likesIncrementor,
  getNewSongs,
};
// ${Math.floor(sec/60)}:${Math.floor(sec%60)}
