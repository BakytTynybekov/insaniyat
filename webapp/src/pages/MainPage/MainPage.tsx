import AwardsSection from "../../components/awardSection/AwardSection";
import { HeroSection } from "../../components/heroSection/HeroSection";
import StayUpdated from "../../components/stayUpdated/StayUpdated";
import CollaborationSection from "../../components/сollaborationSection/CollaborationSection";
// import CurrentFundraisers from "../../components/сurrentFundraisers/CurrentFundraisers";
import { CampaignsPage } from "../CampaignsPage/CampaignsPage";
import { ProgramsPage } from "../ProgramsPage/ProgramsPage";

const MainPage = () => {
  return (
    <>
      <HeroSection />
      <CampaignsPage />
      <CollaborationSection />
      <ProgramsPage />
      <StayUpdated />
      <AwardsSection />
    </>
  );
};

export default MainPage;
