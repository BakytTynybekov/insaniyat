import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

const paymentType = {
  ONE_TIME: "ONE_TIME",
  MONTHLY: "MONTHLY",
} as const;

export const zGetUserDonationsTrpcInput = z.object({
  userId: zStringRequired,
  paymentType: z.nativeEnum(paymentType).optional(),
});
