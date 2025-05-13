import { trpc } from "../../../lib/trpc";
import { zDeleteFundraiserInput } from "./input";

export const deleteFundRaiserTrpcRoute = trpc.procedure
  .input(zDeleteFundraiserInput)
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

    await ctx.prisma.fundRaiser.delete({
      where: {
        id: input.fundraiserId,
      },
    });

    return true;
  });
