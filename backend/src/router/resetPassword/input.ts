import { z } from "zod";

export const zResetPasswordTrpcInput = z.object({
  token: z.string(),
  newPassword: z.string().min(5),
});
