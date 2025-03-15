import { z } from "zod";

export const zSignUpTrpcInput = z.object({
  name: z.string().min(3),
  email: z.string().email("Некорректный формат email"),
  password: z.string().min(5, "Пароль должен содержать минимум 5 символов"),
});
