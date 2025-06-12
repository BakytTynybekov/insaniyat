import { zStringRequired } from "@insaniyat/shared/src/zod";
import { z } from "zod";

export const zCreateSpendingsReportTrpcInput = z.object({
  month: zStringRequired,
  year: zStringRequired,
  totalReceived: z.number().min(1),
  totalSpent: z.number().min(1),
  beneficiariesCount: zStringRequired,
  description: zStringRequired,
  fileUrl: zStringRequired,
});
