import { zEmailRequired, zStringOptional, zStringRequired } from "../../../lib/zod";
import { z } from "zod";

const paymentType = {
  ONE_TIME: "ONE_TIME",
  MONTHLY: "MONTHLY",
} as const;

export const zCreateDonationTrpcInput = z.object({
  amount: zStringRequired,
  paymentType: z.nativeEnum(paymentType),
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: zEmailRequired,
  userId: zStringOptional,
  fundRaiserId: zStringRequired,
});
