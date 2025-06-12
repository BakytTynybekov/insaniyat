import { zStringRequired } from "@insaniyat/shared/src/zod";
import { z } from "zod";

export const zDeleteSpendingReportInput = z.object({
  reportId: zStringRequired,
});
