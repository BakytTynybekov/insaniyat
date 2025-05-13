import { paymentType } from "@prisma/client";
import { z } from "zod";

export const zGetUserDonationsTrpcInput = z.object({
  userId: z.string().min(1),
  paymentType: z.nativeEnum(paymentType).optional(),
});
