export const viewDonationParams = { fundRaiser: ":fundRaiser" };
export type viewDonationParams = typeof viewDonationParams;
export const getViewCampaingRoute = ({ fundRaiser }: { fundRaiser: string }) =>
  `/campaigns/${fundRaiser}`;
