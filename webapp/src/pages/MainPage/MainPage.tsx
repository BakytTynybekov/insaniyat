import AwardsSection from "../../components/awardSection/AwardSection";
import { HeroSection } from "../../components/heroSection/HeroSection";
import { OurPrograms } from "../../components/ourPrograms/OurPrograms";
import StayUpdated from "../../components/stayUpdated/StayUpdated";
import CollaborationSection from "../../components/сollaborationSection/CollaborationSection";
// import CurrentFundraisers from "../../components/сurrentFundraisers/CurrentFundraisers";
import { CampaignsPage } from "../CampaignsPage/CampaignsPage";

const MainPage = () => {
  return (
    <>
      <HeroSection />
      <OurPrograms />
      <CollaborationSection />
      <CampaignsPage />
      <StayUpdated />
      <AwardsSection />
    </>
  );
};

export default MainPage;
