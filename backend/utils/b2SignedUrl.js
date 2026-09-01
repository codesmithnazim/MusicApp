// For the public storage buckets we can easily make the FilterUrl, and the frontend can use that url easily to fetch the data,
// but our bucket is private, in case of private buckets we can't make the fileUrl easily.
// So that's why we need to import the module "getSignedUrl" for generating the private fileurl for accessing the data of private buckets.

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import b2Client from "../config/b2Client.js";
import config from "./config.js";

const getSignedFileUrl = async (key, expiresIn = 3600) => {
  const commond =new GetObjectCommand({
    Bucket: config.BUCKET_NAME,
    Key:key
  });
  return await getSignedUrl(b2Client, commond, { expiresIn });
};

export default getSignedFileUrl
