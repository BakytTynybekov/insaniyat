import { zStringRequired } from "@insaniyat/shared/src/zod";
import { z } from "zod";

export const zCreateProgramTrpcInput = z.object({
  title: zStringRequired,
  description: zStringRequired,
  content: z.string().min(100),
  image: zStringRequired,
});
