import { z } from "zod";
import { trpc } from "../../../lib/trpc";

export const getIncomeReportTrpcRoute = trpc.procedure
  .input(
    z.object({
      year: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const incomeReport = await ctx.prisma.incomeReport.findMany({
      where: {
        year: input.year,
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
