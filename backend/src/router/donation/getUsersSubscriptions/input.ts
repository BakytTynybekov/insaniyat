import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

export const zGetUserSubscriptionsTrpcInput = z.object({
  userId: zStringRequired,
});
