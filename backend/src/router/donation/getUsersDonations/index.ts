import { trpc } from "../../../lib/trpc";
import { zGetUserDonationsTrpcInput } from "./input";

export const getUserDonationsTrpcRoute = trpc.procedure
  .input(zGetUserDonationsTrpcInput)
  .query(async ({ ctx, input }) => {
    if (ctx.me?.id !== input.userId) {
      throw new Error("UNAUTHORIZED");
    }

    const userDonations = await ctx.prisma.donation.findMany({
      where: {
        userId: input.userId,
        paymentType: input.paymentType ?? undefined,
      },
      orderBy: { createdAt: "desc" },
    });

    const totalDonated = await ctx.prisma.donation.aggregate({
      where: {
        userId: input.userId,
      },
      _sum: {
        amount: true,
      },
    });

    return { donations: userDonations, totalDonated: totalDonated._sum };
  });
