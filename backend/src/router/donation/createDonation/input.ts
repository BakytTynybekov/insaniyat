import {
  zEmailRequired,
  zStringOptional,
  zStringRequired,
} from "@insaniyat/shared/src/zod";
import { paymentType } from "@prisma/client";
import { z } from "zod";

export const zCreateDonationTrpcInput = z.object({
  amount: zStringRequired,
  paymentType: z.nativeEnum(paymentType),
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: zEmailRequired,
  userId: zStringOptional,
  fundRaiserId: zStringRequired,
});
