import { z } from "zod";
import { trpc } from "../../../lib/trpc";
import { zStringRequired } from "../../../lib/zod";

export const getProgramTrpcRoute = trpc.procedure
  .input(
    z.object({
      program: zStringRequired,
    })
  )
  .query(async ({ input, ctx }) => {
    const program = await ctx.prisma.program.findUnique({
      where: {
        title: input.program,
      },
      include: {
        fundraisers: true,
      },
    });

    return { program };
  });
