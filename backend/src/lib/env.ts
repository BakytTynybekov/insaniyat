import * as dotenv from "dotenv";
import { z } from "zod";
import { zEnvNonemptyTrimmed } from "@insaniyat/shared/src/zod";

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
});

export const env = zEnv.parse(process.env);
