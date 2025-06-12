import { zStringRequired } from "@insaniyat/shared/src/zod";
import { z } from "zod";

export const zDeleteIncomeReportInput = z.object({
  reportId: zStringRequired,
});
