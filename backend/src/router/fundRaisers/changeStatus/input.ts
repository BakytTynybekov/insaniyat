import { z } from "zod";
import { zStringRequired } from "../../../lib/zod";

const StatusType = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  SUCCESSFUL: "SUCCESSFUL",
} as const;

export const zChangeFundraiserStatusInput = z.object({
  fundraiserId: zStringRequired,
  status: z.nativeEnum(StatusType),
});
