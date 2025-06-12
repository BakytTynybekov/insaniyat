import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "../../../lib/env";
import { ExpectedError } from "../../../lib/error";
import { getS3Client } from "../../../lib/s3";
import { zPrepareS3UploadTrpcInput } from "./input";
import { trpc } from "../../../lib/trpc";
import { getRandomString } from "../../../utils/getRandomString";

const maxFileSize = 10 * 1024 * 1024; // 10MB

export const prepareS3UploadTrpcRoute = trpc.procedure
  .input(zPrepareS3UploadTrpcInput)
  .mutation(async ({ input }) => {
    if (input.fileSize > maxFileSize) {
      throw new ExpectedError("File size should be less then 10MB");
    }

    const s3Client = getS3Client();
    const s3Key = `uploads/${getRandomString(32)}-${input.fileName}`;
    // const params = {
    //   Bucket: "your-bucket-name",
    //   Key: s3Key,
    //   Expires: 3600, // 1 час
    //   ContentType: input.fileType,
    //   ContentLength: input.fileSize,
    // };
    // const signedUrl = await getSignedUrl(s3Client, new PutObjectCommand(params));
    const signedUrl = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: env.S3_BUCKET_NAME,
        Key: s3Key,
        ContentType: input.fileType,
        ContentLength: input.fileSize,
        ACL: "public-read",
        Metadata: {
          "x-amz-acl": "public-read",
        },
      }),
      {
        expiresIn: 3600,
      }
    );

    return {
      signedUrl: signedUrl.replace("amazonaws.com", "storage.selcloud.ru"),
      s3Key: s3Key,
    };
  });
