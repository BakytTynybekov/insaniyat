import { trpc } from "../../../lib/trpc";
import { zCreateDonationTrpcInput } from "./input";

export const createDonationTrpcRoute = trpc.procedure
  .input(zCreateDonationTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.me?.id;
    const userEmail = ctx.me?.email;
    const userName = ctx.me?.name;

    const donation = await ctx.prisma.donation.create({
      data: {
        amount: +input.amount,
        email: userEmail || input.email,
        name: userName || input.name,
        userId: userId || null,
        paymentType: input.paymentType,
      },
    });

    return donation;
  });
