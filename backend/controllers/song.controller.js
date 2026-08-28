import express from "express";
import logger from "../utils/logger.js";
import { Song } from "../models/song.model.js";
const songsRouter = express.Router();

songsRouter.get("/", async (req, res, next) => {
  try {
    // res.status(200).json({ message: "Everything is fine" });
    const mongoRes= await Song.find()
    res.status(200).json(mongoRes)
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

songsRouter.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    logger.info("body of the request", body)
    const mongoRes = await Song.create(body);
    res.status(201).json(mongoRes);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export { songsRouter };
