import { trpc } from "../../lib/trpc";

export const getProgramsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const programs = await ctx.prisma.program.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      image: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  return { programs };
});
