import { zStringRequired } from "../../../lib/zod";
import { z } from "zod";

export const zSignInTrpcInput = z.object({
  email: zStringRequired,
  password: zStringRequired,
});
