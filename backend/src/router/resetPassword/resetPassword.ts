import { trpc } from "../../lib/trpc";
import { getPasswordHash } from "../../utils/getPasswordHash";
import { zResetPasswordTrpcInput } from "./input";

export const resetPasswordRoute = trpc.procedure
  .input(zResetPasswordTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const resetToken = await ctx.prisma.passwordResetToken.findFirst({
      where: {
        token: input.token,
        expiresAt: { gt: new Date() },
      },
    });

    if (!resetToken) {
      throw new Error("Неверный или просроченный токен");
    }

    await ctx.prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        password: getPasswordHash(input.newPassword),
      },
    });

    await ctx.prisma.passwordResetToken.delete({
      where: {
        token: input.token,
      },
    });

    return { success: true };
  });
