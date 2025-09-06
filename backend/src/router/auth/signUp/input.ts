import { zEmailRequired, zStringRequired } from "../../../lib/zod";
import { z } from "zod";

export const zSignUpTrpcInput = z.object({
  name: zStringRequired,
  email: zEmailRequired,
  password: zStringRequired,
});
