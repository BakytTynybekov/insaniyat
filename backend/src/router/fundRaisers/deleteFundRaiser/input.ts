import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

export const zDeleteFundraiserInput = z.object({
  fundraiserId: zStringRequired,
});
