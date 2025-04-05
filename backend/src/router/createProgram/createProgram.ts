import { trpc } from "../../lib/trpc";
import { zCreateProgramTrpcInput } from "./input";

export const createProgramTrpcRoute = trpc.procedure
  .input(zCreateProgramTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const exProgram = await ctx.prisma.program.findUnique({
      where: {
        title: input.title,
      },
    });

    if (exProgram) {
      throw new Error("Программа с таким именем уже существует!!!");
    }

    await ctx.prisma.program.create({
      data: input,
    });
    return true;
  });
