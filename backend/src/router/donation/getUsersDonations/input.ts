import { zStringRequired } from "@insaniyat/shared/src/zod";
import { paymentType } from "@prisma/client";
import { z } from "zod";

export const zGetUserDonationsTrpcInput = z.object({
  userId: zStringRequired,
  paymentType: z.nativeEnum(paymentType).optional(),
});
