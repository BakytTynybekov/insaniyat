import { StatusType } from "@prisma/client";
import { z } from "zod";

export const zChangeFundraiserStatusInput = z.object({
  fundraiserId: z.string().min(1),
  status: z.nativeEnum(StatusType),
});
