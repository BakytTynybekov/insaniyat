import { trpc } from "../../../lib/trpc";
import { zCreateIncomeReportTrpcInput } from "./input";

export const createIncomeReportTrpcRoute = trpc.procedure
  .input(zCreateIncomeReportTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me?.isAdmin) {
      throw new Error("Доступ для вас закрыт!");
    }
    const exIncomeReport = await ctx.prisma.incomeReport.findFirst({
      where: {
        year: input.year,
        month: input.month,
      },
    });

    if (exIncomeReport) {
      throw new Error(
        "Отчет на этот месяц этого года уже существует, удалите его сперва, если хотите добавить новый!!!"
      );
    }
    await ctx.prisma.incomeReport.create({
      data: input,
    });
    return true;
  });
