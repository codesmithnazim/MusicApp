import { Upload } from "@aws-sdk/lib-storage";
import config from "./config.js";
import b2Client from "../config/b2Client.js";

const createFileUpload=({ file, key})=>{
    console.log("the file cam to createFileUpload() = ", file)
    console.log("the data of both the keys = ", key)

   return new Upload({
        client: b2Client,
        params: {
          Bucket: config.BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        },
      });
}

export default createFileUpload