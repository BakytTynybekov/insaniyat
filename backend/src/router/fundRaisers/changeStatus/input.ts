import { zStringRequired } from "@insaniyat/shared/src/zod";
import { StatusType } from "@prisma/client";
import { z } from "zod";

export const zChangeFundraiserStatusInput = z.object({
  fundraiserId: zStringRequired,
  status: z.nativeEnum(StatusType),
});
