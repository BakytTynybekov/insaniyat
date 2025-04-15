import { z } from "zod";

export const zUpdateProfileTrpcInput = z.object({
  email: z.string().min(1),
  name: z.string().max(50).default(""),
});
