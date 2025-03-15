import { z } from "zod";

export const zCreateFundRaiserTrpcInput = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  text: z.string().min(100),
  goal: z.string().min(1),
  raised: z.number(),
  image: z.string().min(1),
  images: z.array(z.string()).optional(),
});
