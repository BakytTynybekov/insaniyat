import { zStringRequired } from "@insaniyat/shared/src/zod";
import { z } from "zod";

export const zDeleteFundraiserInput = z.object({
  fundraiserId: zStringRequired,
});
