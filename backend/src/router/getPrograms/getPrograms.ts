import { programs } from "../../lib/programs";
import { trpc } from "../../lib/trpc";

export const getProgramsTrpcRoute = trpc.procedure.query(() => {
  return { programs };
});
