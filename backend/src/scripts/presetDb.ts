import { type AppContext } from "../lib/context";
import { env } from "../lib/env";
import { getPasswordHash } from "../utils/getPasswordHash";

export const presetDb = async (ctx: AppContext) => {
  await ctx.prisma.user.upsert({
    where: {
      email: "admin@admin.com",
    },
    create: {
      name: "Admin",
      email: "admin@admin.com",
      password: getPasswordHash(env.INITIAL_ADMIN_PASSWORD),
      isAdmin: true,
    },
    update: {
      isAdmin: true,
    },
  });
};
