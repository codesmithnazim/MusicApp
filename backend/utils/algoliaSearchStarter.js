import { algoliasearch } from "algoliasearch";
import config from "./config.js";
import mongoose from "mongoose";
mongoose.connect(config.MONGODB_URI);

const algoliaClient = algoliasearch(
  config.ALGOLIA_APP_ID,
  config.ALGOLIA_ADMIN_API_KEY,
);

import { Song } from "../models/song.model.js";
const res = await Song.find({});
console.log(res);

const songs = res.map((song) => {
  return {
    objectID: song._id.toString(), // required, maps to Mongo _id
    title: song.title,
    artist: song.artist,
    genre: song.genre,
    description: song.description,
    coverUrl: song.coverUrl,
    audioUrl: song.audioUrl,
    plays: song.plays,
    duration: song.duration,
    createdAt: song.createdAt,
  };
});

algoliaClient.saveObjects({
  indexName: "songs",
  objects: songs,
});

mongoose.connection.close();

