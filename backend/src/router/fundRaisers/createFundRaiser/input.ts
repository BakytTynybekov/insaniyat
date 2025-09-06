import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

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
