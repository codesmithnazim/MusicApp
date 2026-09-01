import { S3Client } from "@aws-sdk/client-s3";
import config from "../utils/config.js";

const b2Client = new S3Client({
  endpoint: `https://${config.B2_ENDPOINT}`,
  region: config.B2_REGION,
  credentials: {
    accessKeyId: config.B2_KEY_ID,
    secretAccessKey: config.B2_APP_KEY,
  }, 
});

export default b2Client;
