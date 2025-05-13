import { sendPasswordResetEmail } from "../../../lib/mailer";
import { trpc } from "../../../lib/trpc";
import { zReqPasswordResetRouteInput } from "./input";
import { v4 as uuidv4 } from "uuid";

export const reqPasswordResetRoute = trpc.procedure
  .input(zReqPasswordResetRouteInput)
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 3600000);

    await ctx.prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    await sendPasswordResetEmail(input.email, token);
  });
