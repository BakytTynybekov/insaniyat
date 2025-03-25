import { trpc } from "../lib/trpc";
import { createFundRaiserTrpcRoute } from "./createFundRaiser/createFundRaiser";
import { getFundRaiserTrpcRoute } from "./getFundRaiser/getFundRaiser";
import { getFundRaisersTrpcRoute } from "./getFundRaisers/getFundRaisers";
import { getMeTrpcRoute } from "./getMe/getMe";
import { getProgramsTrpcRoute } from "./getPrograms/getPrograms";
import { reqPasswordResetRoute } from "./reqPasswordResetRoute/reqPasswordResetRoute";
import { resetPasswordRoute } from "./resetPassword/resetPassword";
import { signUpTrpcRoute } from "./signUp/signUp";
import { signInTrpcRoute } from "./singIn/signIn";

export const trpcRouter = trpc.router({
  getPrograms: getProgramsTrpcRoute,
  getFundRaisers: getFundRaisersTrpcRoute,
  getFundRaiser: getFundRaiserTrpcRoute,
  createFundRaiser: createFundRaiserTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  getMe: getMeTrpcRoute,
  requestPasswordReset: reqPasswordResetRoute,
  resetPassword: resetPasswordRoute,
});

export type TrpcRouter = typeof trpcRouter;
