import { z } from "zod";
import { trpc } from "../../../lib/trpc";
import { zStringRequired } from "../../../lib/zod";

export const getFundRaiserTrpcRoute = trpc.procedure
  .input(
    z.object({
      fundRaiser: zStringRequired,
    })
  )
  .query(async ({ ctx, input }) => {
    const fundRaiser = await ctx.prisma.fundRaiser.findUnique({
      where: {
        title: input.fundRaiser,
      },
      include: { donations: true },
    });

    return { fundRaiser };
  });
