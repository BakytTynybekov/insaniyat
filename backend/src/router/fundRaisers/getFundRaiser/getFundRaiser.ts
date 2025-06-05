import { z } from "zod";
import { trpc } from "../../../lib/trpc";
import { zStringRequired } from "@insaniyat/shared/src/zod";

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
    });

    return { fundRaiser };
  });
