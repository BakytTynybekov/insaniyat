import { z } from "zod";
import { trpc } from "../../../lib/trpc";
import { zStringRequired } from "../../../lib/zod";

export const getIncomeReportTrpcRoute = trpc.procedure
  .input(
    z.object({
      year: zStringRequired,
    })
  )
  .query(async ({ input, ctx }) => {
    const incomeReport = await ctx.prisma.incomeReport.findMany({
      where: {
        year: input.year,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalSum = await ctx.prisma.incomeReport.aggregate({
      where: {
        year: input.year,
      },
      _sum: {
        totalReceived: true,
      },
    });

    return { incomeReport, totalSum };
  });
