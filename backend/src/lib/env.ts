import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const zEnv = z.object({
  PORT: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.string().min(1),
  SMTP_USER: z.string().min(1),
  SMTP_PASSWORD: z.string().min(1),
});

export const env = zEnv.parse(process.env);

// SMTP_HOST=smtp.mail.ru
// SMTP_PORT=465
// SMTP_USER=bakyt.tynybekov.ss@mail.ru
// SMTP_PASSWORD=d0jvvkiW94eF9rgyPNzs
