import { zStringRequired } from "@insaniyat/shared/src/zod";
import { z } from "zod";

export const zCreateFundRaiserTrpcInput = z.object({
  title: zStringRequired,
  description: zStringRequired,
  text: zStringRequired,
  programTitle: zStringRequired,
  goal: zStringRequired,
  raised: z.number(),
  image: zStringRequired,
  images: z.array(z.string()).optional(),
});
