import { zStringRequired } from "@insaniyat/shared/src/zod";
import { z } from "zod";

export const zDeleteProgramInput = z.object({
  programId: zStringRequired,
});
