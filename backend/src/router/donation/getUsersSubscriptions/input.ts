import { z } from "zod";

export const zGetUserSubscriptionsTrpcInput = z.object({
  userId: z.string().min(1),
});
