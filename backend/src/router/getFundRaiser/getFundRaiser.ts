import { z } from "zod";
import { trpc } from "../../lib/trpc";
import { fundRaisers } from "../../lib/fundRaisers";

export const getFundRaiserTrpcRoute = trpc.procedure
  .input(
    z.object({
      fundRaiser: z.string(),
    })
  )
  .query(({ input }) => {
    const fundRaiser = fundRaisers.find(
      (fundRaiser) => fundRaiser.title === input.fundRaiser
    );

    return { fundRaiser: fundRaiser || null };
  });
