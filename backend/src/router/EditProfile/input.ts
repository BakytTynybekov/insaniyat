import { z } from "zod";
import { zStringRequired } from "../../lib/zod";

export const zUpdateProfileTrpcInput = z.object({
  email: zStringRequired,
  name: z.string().max(50).default(""),
  avatar: z.string().nullable(),
});
