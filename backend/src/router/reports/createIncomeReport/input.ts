import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

export const zCreateIncomeReportTrpcInput = z.object({
  month: zStringRequired,
  year: zStringRequired,
  totalReceived: z.number().min(1),
  fileUrl: zStringRequired,
});
