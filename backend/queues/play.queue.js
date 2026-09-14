import {Queue} from "bullmq"

console.log("the ctrl of excution came in play.queue.js yes! ")

const playQueue= new Queue('music-play', {
    connection:{
        host: "localhost",
        port:6379
    }
})




export default playQueue