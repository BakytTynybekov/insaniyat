import { zStringRequired } from "@insaniyat/shared/src/zod";
import { z } from "zod";

export const zUpdateProfileTrpcInput = z.object({
  email: zStringRequired,
  name: z.string().max(50).default(""),
  avatar: z.string().nullable(),
});
