import { trpc } from "../../../lib/trpc";
import { zCreateDonationTrpcInput } from "./input";

export const createDonationTrpcRoute = trpc.procedure
  .input(zCreateDonationTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.me?.id;
    const userEmail = ctx.me?.email;
    const userName = ctx.me?.name;

    const fundraiser = await ctx.prisma.fundRaiser.findUnique({
      where: {
        id: input.fundRaiserId,
      },
    });

    if (!fundraiser) {
      throw new Error("Fundraiser not found");
    }
    await ctx.prisma.fundRaiser.update({
      where: {
        id: input.fundRaiserId,
      },
      data: {
        raised: {
          increment: +input.amount,
        },
      },
    });

    if (!userId) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (user) {
        const donation = await ctx.prisma.donation.create({
          data: {
            amount: +input.amount,
            email: input.email,
            name: input.name,
            userId: user.id,
            paymentType: input.paymentType,
          },
        });

        if (input.paymentType === "MONTHLY") {
          await ctx.prisma.subscription.create({
            data: {
              amount: +input.amount,
              email: userEmail || input.email,
              name: userName || input.name,
              userId: userId || null,
            },
          });
        }

        return donation;
      }
    }

    if (input.paymentType === "MONTHLY") {
      await ctx.prisma.subscription.create({
        data: {
          amount: +input.amount,
          email: userEmail || input.email,
          name: userName || input.name,
          userId: userId || null,
        },
      });
    }

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
