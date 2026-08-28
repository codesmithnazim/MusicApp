import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
// import blogRouter from "./controllers/blog.controller.js";
import requestLogger from "./middlewares/requestLogger.js";
import errorHandler from "./middlewares/errorHandler.js";
import unknownEndpoints from "./middlewares/unknownEndpoint.js";
import mongoose from "mongoose";
import config from "./utils/config.js";
import logger from "./utils/logger.js";
import { songsRouter } from "./controllers/song.controller.js";
import { usersRouter } from "./routes/user.route.js";

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(logger.info("MongoDB is connected ✔✔✔"))
  .catch((error) => logger.error("error while connecting to mongoDB", error));

const app = express();
app.use(cors({
  origin:'http://localhost:5173',
  credentials: true
}))
app.use(express.json());
app.use(cookieParser())
app.use(requestLogger);
// app.use("/api/blogs", blogRouter);
app.use('/api/songs', songsRouter)
app.use('/api/user', usersRouter)
app.use(unknownEndpoints);
app.use(errorHandler);
export { app };
