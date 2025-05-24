import { trpc } from "../../../lib/trpc";
import { getPasswordHash } from "../../../utils/getPasswordHash";
import { signJWT } from "../../../utils/signJWT";
import { zSignUpTrpcInput } from "./input";

export const signUpTrpcRoute = trpc.procedure
  .input(zSignUpTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const exUser = await ctx.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (exUser) {
      throw new Error("Пользователь с такой почтой уже существует!!!");
    }

    const user = await ctx.prisma.user.create({
      data: {
        email: input.email,
        password: getPasswordHash(input.password),
        name: input.name,
      },
    });

    await ctx.prisma.donation.updateMany({
      where: {
        email: input.email,
        userId: null,
      },
      data: {
        userId: user.id,
      },
    });

    const token = signJWT(user.id);
    return { token };
  });
