import { trpc } from "../../lib/trpc";
import { zSignUpTrpcInput } from "./input";
import crypto from "crypto";

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
    await ctx.prisma.user.create({
      data: {
        email: input.email,
        password: crypto.createHash("sha256").update(input.password).digest("hex"),
        name: input.name,
      },
    });
    return true;
  });
