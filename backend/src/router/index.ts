import { trpc } from "../lib/trpc";
import { createFundRaiserTrpcRoute } from "./createFundRaiser/createFundRaiser";
import { getFundRaiserTrpcRoute } from "./getFundRaiser/getFundRaiser";
import { getFundRaisersTrpcRoute } from "./getFundRaisers/getFundRaisers";
import { getProgramsTrpcRoute } from "./getPrograms/getPrograms";
import { signUpTrpcRoute } from "./signUp/signUp";

export const trpcRouter = trpc.router({
  getPrograms: getProgramsTrpcRoute,
  getFundRaisers: getFundRaisersTrpcRoute,
  getFundRaiser: getFundRaiserTrpcRoute,
  createFundRaiser: createFundRaiserTrpcRoute,
  signUp: signUpTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
