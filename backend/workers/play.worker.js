import { Worker } from "bullmq";
import playRecorder from "../services/playRecorder.js";
import logger from "../utils/logger.js";
import mongoose from "mongoose";
import config from "../utils/config.js";

mongoose.connect(config.MONGODB_URI, { family: 4 });

console.log("the ctrl of execuation came in worker.js");

const playWorker = new Worker(
  "music-play",
  async (job) => {
    console.log("job name ", job.name);
    console.log("job data ", job.data);
    if (job.name === "record-play") {
      await playRecorder(job.data);
    }
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  },
);

playWorker.on("completed", (job) => {
  console.log(`${job.id} job is completed `);
  // mongoose.connection.close()
});

playWorker.on("failed", (job, error) => {
  logger.error(`job id ${job.id} is failed`, error);
  // mongoose.connection.close()
});

export default playWorker;
