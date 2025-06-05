import { zStringRequired } from "@insaniyat/shared/src/zod";
import { z } from "zod";

export const zSignInTrpcInput = z.object({
  email: zStringRequired,
  password: zStringRequired,
});
