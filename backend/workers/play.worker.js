import { Worker } from "bullmq";
import playRecorder from "../services/playRecorder.js";
import logger from "../utils/logger.js";
import mongoose from "mongoose";
import config from "../utils/config.js";
import IORedis from "ioredis";


mongoose.connect(config.MONGODB_URI, { family: 4 });

console.log("the ctrl of execuation came in worker.js");

const connection = new IORedis(config.REDIS_URL, {
  maxRetriesPerRequest: null, // required by BullMQ Workers
});


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
    connection: connection,
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
