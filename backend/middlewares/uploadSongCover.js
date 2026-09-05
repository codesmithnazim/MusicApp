import multer from "multer";
import logger from "../utils/logger.js";

const storage = multer.memoryStorage();

const uploadSongCover =  multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes("image/")) {
      logger.info("the mime type of the file user uploaded ", file.mimetype);
      return cb(new Error("unsupported file"));
    }
    return cb(null, true);
  },
});

export default uploadSongCover;
