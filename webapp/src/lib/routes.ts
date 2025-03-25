export const getViewCampaignsRoute = "/campaigns";

export const viewDonationParams = { fundRaiser: ":fundRaiser" };
export type viewDonationParams = typeof viewDonationParams;
export const getViewDonationRoute = ({ fundRaiser }: { fundRaiser: string }) =>
  `/campaigns/${fundRaiser}`;

export const getNewDonationRoute = () => "/campaigns/new";
export const getSignUpRoute = () => "/sign-up";

export const getSignInRoute = () => "/sign-in";
export const getSignOutRoute = () => "/sign-out";
export const reqResetPasswordRoute = () => "/reset-password";

export const viewResetPasswordParams = { token: "token" };
export const resetPasswordRoute = ({ token }: { token: string }) =>
  `/reset-password?token=${encodeURIComponent(token)}`;
