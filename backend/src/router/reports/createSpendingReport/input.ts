import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

export const zCreateSpendingsReportTrpcInput = z.object({
  month: zStringRequired,
  year: zStringRequired,
  totalReceived: z.number().min(1),
  totalSpent: z.number().min(1),
  beneficiariesCount: zStringRequired,
  description: zStringRequired,
  fileUrl: zStringRequired,
});
