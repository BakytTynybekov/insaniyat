import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

export const zCreateProgramTrpcInput = z.object({
  title: zStringRequired,
  description: zStringRequired,
  content: z.string().min(100),
  image: zStringRequired,
});
