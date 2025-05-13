import { z } from "zod";

export const zCreateProgramTrpcInput = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(100),
  image: z.string().min(1),
});
