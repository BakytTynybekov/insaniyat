import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

export const zDeleteIncomeReportInput = z.object({
  reportId: zStringRequired,
});
