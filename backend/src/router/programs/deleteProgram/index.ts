import { trpc } from "../../../lib/trpc";
import { zDeleteProgramInput } from "./input";

export const deleteProgramTrpcRoute = trpc.procedure
  .input(zDeleteProgramInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me?.isAdmin) {
      throw new Error("PERMISSION DENIED");
    }

    const program = await ctx.prisma.program.findUnique({
      where: {
        id: input.programId,
      },
    });

    if (!program) {
      throw new Error("Program is not found");
    }

    await ctx.prisma.program.delete({
      where: {
        id: input.programId,
      },
    });

    return true;
  });
