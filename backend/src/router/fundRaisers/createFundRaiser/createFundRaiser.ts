import { trpc } from "../../../lib/trpc";
import { zCreateFundRaiserTrpcInput } from "./input";

export const createFundRaiserTrpcRoute = trpc.procedure
  .input(zCreateFundRaiserTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const exFundRaiser = await ctx.prisma.fundRaiser.findUnique({
      where: {
        title: input.title,
      },
    });

    if (exFundRaiser) {
      throw new Error("Сбор с таким именем уже существует!!!");
    }
    await ctx.prisma.fundRaiser.create({
      data: input,
    });
    return true;
  });
