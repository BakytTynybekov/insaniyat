import { fundRaisers } from "../../lib/fundRaisers";
import { trpc } from "../../lib/trpc";

export const getFundRaisersTrpcRoute = trpc.procedure.query(() => {
  return { fundRaisers };
});
