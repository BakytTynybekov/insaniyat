import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

export const zDeleteProgramInput = z.object({
  programId: zStringRequired,
});
