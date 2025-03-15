export const getViewCampaignsRoute = "/campaigns";

export const viewDonationParams = { fundRaiser: ":fundRaiser" };
export type viewDonationParams = typeof viewDonationParams;
export const getViewDonationRoute = ({ fundRaiser }: { fundRaiser: string }) =>
  `/campaigns/${fundRaiser}`;

export const getNewDonationRoute = () => "/campaigns/new";
export const getSingUpRoute = () => "/signUp";
