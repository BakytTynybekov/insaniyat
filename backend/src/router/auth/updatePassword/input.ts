import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

export const zUpdatePasswordTrpcInput = z.object({
  oldPassword: zStringRequired,
  newPassword: zStringRequired,
});
