import { z } from "zod";

export const zReqPasswordResetRouteInput = z.object({
  email: z.string().email(),
});
