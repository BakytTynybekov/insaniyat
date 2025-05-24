import { trpc } from "../../../lib/trpc";
import { zCreateSpendingsReportTrpcInput } from "./input";

export const createSpendingsReportTrpcRoute = trpc.procedure
  .input(zCreateSpendingsReportTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me?.isAdmin) {
      throw new Error("Доступ для вас закрыт!");
    }
    const exIncomeReport = await ctx.prisma.spendinsReport.findFirst({
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
    await ctx.prisma.spendinsReport.create({
      data: input,
    });
    return true;
  });
