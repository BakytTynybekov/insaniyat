import AwardsSection from "../../components/awardSection/AwardSection";
import Footer from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { HeroSection } from "../../components/heroSection/HeroSection";
import { OurPrograms } from "../../components/ourPrograms/OurPrograms";
import StayUpdated from "../../components/stayUpdated/StayUpdated";
import CollaborationSection from "../../components/сollaborationSection/CollaborationSection";
import CurrentFundraisers from "../../components/сurrentFundraisers/CurrentFundraisers";

const MainPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <OurPrograms />
      <CollaborationSection />
      <CurrentFundraisers />
      <StayUpdated />
      <AwardsSection />
      <Footer />
    </>
  );
};

export default MainPage;
