import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

export const zDeleteSpendingReportInput = z.object({
  reportId: zStringRequired,
});
