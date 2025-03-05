import { trpc } from "../lib/trpc";
import { createFundRaiserTrpcRoute } from "./createFundRaiser/createFundRaiser";
import { getFundRaiserTrpcRoute } from "./getFundRaiser/getFundRaiser";
import { getFundRaisersTrpcRoute } from "./getFundRaisers/getFundRaisers";
import { getProgramsTrpcRoute } from "./getPrograms/getPrograms";

export const trpcRouter = trpc.router({
  getPrograms: getProgramsTrpcRoute,
  getFundRaisers: getFundRaisersTrpcRoute,
  getFundRaiser: getFundRaiserTrpcRoute,
  createFundRaiser: createFundRaiserTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
