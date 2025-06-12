import { S3Client } from "@aws-sdk/client-s3";
import { env } from "./env";
import _ from "lodash";

export const getS3Client = _.memoize(() => {
  if (!env.S3_ACCESS_KEY_ID) {
    throw new Error("S3_ACCESS_KEY_ID is missing");
  }
  if (!env.S3_SECRET_ACCESS_KEY) {
    throw new Error("S3_SECRET_ACCESS_KEY is missing");
  }
  if (!env.S3_BUCKET_NAME) {
    throw new Error("S3_BUCKET_NAME is missing");
  }
  if (!env.S3_REGION) {
    throw new Error("S3_REGION is missing");
  }
  const s3Client = new S3Client({
    region: env.S3_REGION,
    endpoint: `https://s3.${env.S3_REGION}.storage.selcloud.ru`,

    credentials: {
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    },
    forcePathStyle: false,
  });
  return s3Client;
});
