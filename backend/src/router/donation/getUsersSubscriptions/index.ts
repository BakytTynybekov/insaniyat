import { trpc } from "../../../lib/trpc";
import { zGetUserSubscriptionsTrpcInput } from "./input";

export const getUserSubscriptionsTrpcRoute = trpc.procedure
  .input(zGetUserSubscriptionsTrpcInput)
  .query(async ({ ctx, input }) => {
    if (ctx.me?.id !== input.userId) {
      throw new Error("UNAUTHORIZED");
    }

    const userSubscriptions = await ctx.prisma.subscription.findMany({
      where: {
        userId: input.userId,
      },
    });

    return userSubscriptions;
  });
