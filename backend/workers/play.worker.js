import { Worker } from "bullmq";
import playRecorder from "../services/playRecorder.js";
import logger from "../utils/logger.js";

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


playWorker.on("completed",(job)=>{
  console.log(`${job.id} job is completed `)
})


playWorker.on("failed",(job, error)=>{
  logger.error(`job id ${job.id} is failed`, error)
})

export default playWorker