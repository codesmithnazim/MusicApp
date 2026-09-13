import {Queue} from "bullmq"

const playQueue= new Queue('play-music', {
    connection:{
        host: "localhost",
        port:6379
    }
})




export default playQueue