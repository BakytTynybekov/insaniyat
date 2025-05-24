import { z } from "zod";

export const zCreateIncomeReportTrpcInput = z.object({
  month: z.string().min(1),
  year: z.string().min(1),
  totalReceived: z.number().min(1),
  fileUrl: z.string().url(),
});
