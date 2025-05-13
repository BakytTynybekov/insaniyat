import { paymentType } from "@prisma/client";
import { z } from "zod";

export const zCreateDonationTrpcInput = z.object({
  amount: z.string().min(1),
  paymentType: z.nativeEnum(paymentType),
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  userId: z.string().min(1).optional(),
});
