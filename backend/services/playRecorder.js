import { Song } from "../models/song.model.js"
import { User } from "../models/user.model.js"
import logger from "../utils/logger.js"

const playRecorder=async (data)=>{
    console.log("the data from  the worker ", data)
  const mongoRes1=  await   Song.findByIdAndUpdate(data.songId, {$inc:{plays: 1}}, {returnDocument: "after"})
   const mongoRes2= await   User.findByIdAndUpdate(data.userId, {$inc:{plays: 1}}, {returnDocument: "after"})
  //  console.log("mongores during incrementing the plays = ", mongoRes1)
  //  console.log("mongores during incrementing the plays = ",  mongoRes2)
   if(mongoRes1 && mongoRes2){
    logger.info("plays attribute of both song and user is incremented successfully")
   }
}


export default playRecorder