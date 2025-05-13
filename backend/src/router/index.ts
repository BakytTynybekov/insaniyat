import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { trpc } from "../lib/trpc";
import { editProfileTrpcRoute } from "./EditProfile/EditProfile";
import { signInTrpcRoute } from "./auth/singIn/signIn";
import { signUpTrpcRoute } from "./auth/signUp/signUp";
import { getProgramsTrpcRoute } from "./programs/getPrograms/getPrograms";
import { getProgramTrpcRoute } from "./programs/getProgram/getProgram";
import { updateProgramTrpcRoute } from "./programs/updateProgram/updateProgram";
import { getFundRaisersTrpcRoute } from "./fundRaisers/getFundRaisers/getFundRaisers";
import { createFundRaiserTrpcRoute } from "./fundRaisers/createFundRaiser/createFundRaiser";
import { getFundRaiserTrpcRoute } from "./fundRaisers/getFundRaiser/getFundRaiser";
import { getFundraiserByDirectionTrpcRoute } from "./fundRaisers/getFundraiserByDirection/getFundraiserByDirection";
import { createProgramTrpcRoute } from "./programs/createProgram/createProgram";
import { getMeTrpcRoute } from "./auth/getMe/getMe";
import { reqPasswordResetRoute } from "./auth/reqPasswordResetRoute/reqPasswordResetRoute";
import { resetPasswordRoute } from "./auth/resetPassword/resetPassword";
import { updatePasswordTrpcRoute } from "./auth/updatePassword";

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
  getProgram: getProgramTrpcRoute,
  getFundraiserByDirection: getFundraiserByDirectionTrpcRoute,
  createProgram: createProgramTrpcRoute,
  updateProgram: updateProgramTrpcRoute,
  editProfile: editProfileTrpcRoute,
  updatePassword: updatePasswordTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
