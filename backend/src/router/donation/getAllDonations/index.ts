import { trpc } from "../../../lib/trpc";

export const getAllDonationsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  if (!ctx.me?.isAdmin) {
    throw new Error("UNAUTHORIZED");
  }

  const donations = await ctx.prisma.donation.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return donations;
});
