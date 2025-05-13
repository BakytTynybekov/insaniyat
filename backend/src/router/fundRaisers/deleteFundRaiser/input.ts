import { z } from "zod";

export const zDeleteFundraiserInput = z.object({
  fundraiserId: z.string().min(1),
});
