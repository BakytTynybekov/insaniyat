import { z } from "zod";

export const zCreateSpendingsReportTrpcInput = z.object({
  month: z.string().min(1),
  year: z.string().min(1),
  totalReceived: z.number().min(1),
  totalSpent: z.number().min(1),
  beneficiariesCount: z.string().min(1),
  description: z.string().min(1),
  fileUrl: z.string().url(),
});
