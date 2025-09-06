import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

export const zPrepareS3UploadTrpcInput = z.object({
  fileName: zStringRequired,
  fileType: zStringRequired,
  fileSize: z.number().int().positive(),
});
