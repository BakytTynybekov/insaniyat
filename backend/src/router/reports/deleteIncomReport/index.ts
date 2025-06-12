import { trpc } from "../../../lib/trpc";
import { zDeleteIncomeReportInput } from "./input";

export const deleteIncomeReportTrpcRoute = trpc.procedure
  .input(zDeleteIncomeReportInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me?.isAdmin) {
      throw new Error("PERMISSION DENIED");
    }

    const report = await ctx.prisma.incomeReport.findUnique({
      where: {
        id: input.reportId,
      },
    });

    if (!report) {
      throw new Error("Program is not found");
    }

    await ctx.prisma.incomeReport.delete({
      where: {
        id: input.reportId,
      },
    });

    return true;
  });
