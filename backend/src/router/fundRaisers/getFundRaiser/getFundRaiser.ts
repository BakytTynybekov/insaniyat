import { z } from "zod";
import { trpc } from "../../../lib/trpc";

export const getFundRaiserTrpcRoute = trpc.procedure
  .input(
    z.object({
      fundRaiser: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const fundRaiser = await ctx.prisma.fundRaiser.findUnique({
      where: {
        title: input.fundRaiser,
      },
    });

    return { fundRaiser };
  });
