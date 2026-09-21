import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import b2Client from "../config/b2Client.js";
import config from "../utils/config.js";
import logger from "../utils/logger.js";
const deleteFile = async (key) => {
  logger.info("received key id for deletion = ", key);
  if (!key) return logger.info("can not delete unknown object ");
  try {
    await b2Client.send(
      new DeleteObjectCommand({
        Bucket: config.BUCKET_NAME,
        Key: key,
      }),
    );
  } catch (error) {
    logger.error("error = ", error);
  }
};

export default deleteFile;
