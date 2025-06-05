import { z } from "zod";
import { trpc } from "../../../lib/trpc";
import { zStringRequired } from "@insaniyat/shared/src/zod";

export const getFundraiserByDirectionTrpcRoute = trpc.procedure
  .input(
    z.object({
      program: zStringRequired,
    })
  )
  .query(async ({ input, ctx }) => {
    const fundRaisers = ctx.prisma.fundRaiser.findMany({
      where: { programTitle: input.program },
      include: {
        program: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return fundRaisers;
  });
