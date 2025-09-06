import { z } from "zod";
import { trpc } from "../../../lib/trpc";
import { zStringRequired } from "../../../lib/zod";

export const getSpendingsReportTrpcRoute = trpc.procedure
  .input(
    z.object({
      year: zStringRequired,
    })
  )
  .query(async ({ input, ctx }) => {
    const spendingsReport = await ctx.prisma.spendinsReport.findMany({
      where: {
        year: input.year,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalSumReceived = await ctx.prisma.spendinsReport.aggregate({
      where: {
        year: input.year,
      },
      _sum: {
        totalReceived: true,
      },
    });

    const totalSumSpent = await ctx.prisma.spendinsReport.aggregate({
      where: {
        year: input.year,
      },
      _sum: {
        totalSpent: true,
      },
    });

    return {
      spendingsReport,
      totalSumReceived: totalSumReceived._sum.totalReceived,
      totalSumSpent: totalSumSpent._sum.totalSpent,
    };
  });
