import { trpc } from "../../../lib/trpc";
import { zChangeFundraiserStatusInput } from "./input";

export const changeFundRaiserStatusTrpcRoute = trpc.procedure
  .input(zChangeFundraiserStatusInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me?.isAdmin) {
      throw new Error("PERMISSION DENIED");
    }

    const fundraiser = await ctx.prisma.fundRaiser.findUnique({
      where: {
        id: input.fundraiserId,
      },
    });

    if (!fundraiser) {
      throw new Error("Fundraiser is not found");
    }

    await ctx.prisma.fundRaiser.update({
      where: {
        id: input.fundraiserId,
      },
      data: {
        status: input.status,
      },
    });

    return true;
  });
