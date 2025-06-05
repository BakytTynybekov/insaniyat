import { zStringRequired } from "@insaniyat/shared/src/zod";
import { z } from "zod";

export const zCreateIncomeReportTrpcInput = z.object({
  month: zStringRequired,
  year: zStringRequired,
  totalReceived: z.number().min(1),
  fileUrl: z.string().url(),
});
