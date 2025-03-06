import { z } from "zod";

export const zCreateIdeaTrpcInput = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
  text: z.string().min(100),
  goal: z.string().min(1),
  raised: z.number(),
  image: z.string().min(1),
});
