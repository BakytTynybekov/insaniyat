import { z } from "zod";

export const zDeleteProgramInput = z.object({
  programId: z.string().min(1),
});
