import { trpc } from "../../../lib/trpc";
import { zUpdateProgramTrpcInput } from "./input";

export const updateProgramTrpcRoute = trpc.procedure
  .input(zUpdateProgramTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { programExTitle, ...programInput } = input;
    if (!ctx.me) {
      throw new Error("Unauthorized");
    }
    if (!ctx.me?.isAdmin) {
      throw new Error("Доступ для вас закрыт!");
    }
    let program = await ctx.prisma.program.findUnique({
      where: {
        title: programExTitle,
      },
    });

    if (!program) {
      throw new Error("Program not found");
    }

    if (input.title !== programExTitle) {
      const exProgram = await ctx.prisma.program.findUnique({
        where: {
          title: input.title,
        },
      });

      if (exProgram) {
        throw new Error("Program with this title already exists");
      }
    }

    await ctx.prisma.program.update({
      where: {
        title: programExTitle,
      },
      data: {
        ...programInput,
      },
    });

    return true;
  });
