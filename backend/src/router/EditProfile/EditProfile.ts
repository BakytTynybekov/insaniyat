import { trpc } from "../../lib/trpc";
import { zUpdateProfileTrpcInput } from "./input";
import { toClientMe } from "../../lib/models";

export const editProfileTrpcRoute = trpc.procedure
  .input(zUpdateProfileTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error("Unauthorized");
    }

    if (ctx.me.email !== input.email) {
      const exUser = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (exUser) {
        throw new Error("User with whis email is already exist");
      }
    }

    const updateMe = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: input,
    });

    ctx.me = updateMe;

    return toClientMe(updateMe);
  });
