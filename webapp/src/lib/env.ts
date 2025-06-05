import { zEnvNonemptyTrimmed } from "@insaniyat/shared/src/zod";
import { z } from "zod";

export const zEnv = z.object({
  VITE_BACKEND_TRPC_URL: zEnvNonemptyTrimmed,
  VITE_CLOUDINARY_CLOUD_NAME: zEnvNonemptyTrimmed,
});

export const env = zEnv.parse(import.meta.env);
