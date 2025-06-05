import { z } from "zod";

// input.ts
export const CloudinaryUploadType = z.enum(["avatar", "image"]);
export const zPrepareCloundinaryUploadTrpcInput = z.object({
  type: CloudinaryUploadType,
});
