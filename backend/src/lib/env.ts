import * as dotenv from "dotenv";
import { z } from "zod";
import {
  zEnvNonemptyTrimmed,
  zEnvNonemptyTrimmedRequiredOnNotLocal,
} from "@insaniyat/shared/src/zod";

dotenv.config();
const zEnv = z.object({
  PORT: zEnvNonemptyTrimmed,
  DATABASE_URL: zEnvNonemptyTrimmed,
  JWT_SECRET: zEnvNonemptyTrimmed,
  PASSWORD_SALT: zEnvNonemptyTrimmed,
  WEBAPP_URL: zEnvNonemptyTrimmed,
  SMTP_HOST: zEnvNonemptyTrimmed,
  SMTP_PORT: zEnvNonemptyTrimmed,
  SMTP_USER: zEnvNonemptyTrimmed,
  SMTP_PASSWORD: zEnvNonemptyTrimmed,
  INITIAL_ADMIN_PASSWORD: zEnvNonemptyTrimmed,
  CLOUDINARY_API_KEY: zEnvNonemptyTrimmed,
  CLOUDINARY_API_SECRET: zEnvNonemptyTrimmed,
  CLOUDINARY_CLOUD_NAME: zEnvNonemptyTrimmed,
  S3_ACCESS_KEY_ID: zEnvNonemptyTrimmedRequiredOnNotLocal,
  S3_SECRET_ACCESS_KEY: zEnvNonemptyTrimmedRequiredOnNotLocal,
  S3_BUCKET_NAME: zEnvNonemptyTrimmedRequiredOnNotLocal,
  S3_REGION: zEnvNonemptyTrimmedRequiredOnNotLocal,
  S3_URL: zEnvNonemptyTrimmed,
});

export const env = zEnv.parse(process.env);
