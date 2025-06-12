import { trpc } from "../../../lib/trpc";
import { zDeleteSpendingReportInput } from "./input";

export const deleteSpendingReportTrpcRoute = trpc.procedure
  .input(zDeleteSpendingReportInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me?.isAdmin) {
      throw new Error("У вас нет доступа!!!");
    }

    const report = await ctx.prisma.spendinsReport.findUnique({
      where: {
        id: input.reportId,
      },
    });

    if (!report) {
      throw new Error("Отчет не найден!");
    }

    await ctx.prisma.spendinsReport.delete({
      where: {
        id: input.reportId,
      },
    });

    return true;
  });
