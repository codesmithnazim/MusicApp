import { Queue } from "bullmq";
import config from "../utils/config.js";
import IORedis from "ioredis";


console.log("the ctrl of excution came in play.queue.js yes! ");

const connection = new IORedis(config.REDIS_URL, {
  maxRetriesPerRequest: null, // required by BullMQ Workers
});


const playQueue = new Queue("music-play", {
  connection: connection,
});

export default playQueue;
