import { zEmailRequired, zStringRequired } from "@insaniyat/shared/src/zod";
import { z } from "zod";

export const zSignUpTrpcInput = z.object({
  name: zStringRequired,
  email: zEmailRequired,
  password: zStringRequired,
});
