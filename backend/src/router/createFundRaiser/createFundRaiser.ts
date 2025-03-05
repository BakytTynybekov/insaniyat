import { z } from "zod";
import { trpc } from "../../lib/trpc";
import { fundRaisers } from "../../lib/fundRaisers";

export const createFundRaiserTrpcRoute = trpc.procedure
  .input(
    z.object({
      id: z.number(),
      title: z.string().min(1),
      description: z.string().min(1),
      text: z.string().min(100),
      goal: z.string().min(1),
      raised: z.number(),
      image: z.string().min(1),
    })
  )
  .mutation(({ input }) => {
    fundRaisers.push(input);
    return true;
  });
