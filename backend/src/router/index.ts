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
import { deleteFundRaiserTrpcRoute } from "./fundRaisers/deleteFundRaiser";
import { deleteProgramTrpcRoute } from "./programs/deleteProgram";
import { createDonationTrpcRoute } from "./donation/createDonation";
import { getUserDonationsTrpcRoute } from "./donation/getUsersDonations";
import { getUserSubscriptionsTrpcRoute } from "./donation/getUsersSubscriptions";
import { changeFundRaiserStatusTrpcRoute } from "./fundRaisers/changeStatus";
import { getAllDonationsTrpcRoute } from "./donation/getAllDonations";
import { createSpendingsReportTrpcRoute } from "./reports/createSpendingReport";
import { createIncomeReportTrpcRoute } from "./reports/createIncomeReport";
import { getIncomeReportTrpcRoute } from "./reports/getIncomeReport";
import { getSpendingsReportTrpcRoute } from "./reports/getSpendingsReport";

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
  deleteFundRaiser: deleteFundRaiserTrpcRoute,
  deleteProgram: deleteProgramTrpcRoute,
  createDonation: createDonationTrpcRoute,
  getUsersDonations: getUserDonationsTrpcRoute,
  getUsersSubscriptions: getUserSubscriptionsTrpcRoute,
  changeFundRaiserStatus: changeFundRaiserStatusTrpcRoute,
  getAllDonations: getAllDonationsTrpcRoute,
  createSpendingsReport: createSpendingsReportTrpcRoute,
  createIncomeReport: createIncomeReportTrpcRoute,
  getIncomeReport: getIncomeReportTrpcRoute,
  getSpendingsReport: getSpendingsReportTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
