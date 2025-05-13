import { trpc } from "../../../lib/trpc";

export const getFundRaisersTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const fundRaisers = await ctx.prisma.fundRaiser.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      goal: true,
      raised: true,
      status: true,
      image: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  return { fundRaisers };
});
