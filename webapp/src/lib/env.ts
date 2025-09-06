import { zEnvNonemptyTrimmed } from "@insaniyat/backend/src/lib/zod";
import { z } from "zod";

export const zEnv = z.object({
  VITE_BACKEND_TRPC_URL: zEnvNonemptyTrimmed,
  VITE_CLOUDINARY_CLOUD_NAME: zEnvNonemptyTrimmed,
  VITE_S3_URL: zEnvNonemptyTrimmed,
});

export const env = zEnv.parse(import.meta.env);
