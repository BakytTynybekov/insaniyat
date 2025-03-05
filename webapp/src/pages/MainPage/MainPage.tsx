import AwardsSection from "../../components/awardSection/AwardSection";
import { HeroSection } from "../../components/heroSection/HeroSection";
import { OurPrograms } from "../../components/ourPrograms/OurPrograms";
import StayUpdated from "../../components/stayUpdated/StayUpdated";
import CollaborationSection from "../../components/сollaborationSection/CollaborationSection";
import CurrentFundraisers from "../../components/сurrentFundraisers/CurrentFundraisers";

const MainPage = () => {
  return (
    <>
      <HeroSection />
      <OurPrograms />
      <CollaborationSection />
      <CurrentFundraisers />
      <StayUpdated />
      <AwardsSection />
    </>
  );
};

export default MainPage;
