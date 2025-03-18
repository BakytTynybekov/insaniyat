import { Route, Routes } from "react-router";
import { DonationPage } from "./pages/DonationPage/DonationPage";
import MainPage from "./pages/MainPage/MainPage";
import { Header } from "./components/header/Header";
import Footer from "./components/footer/Footer";
import * as routes from "./lib/routes";
import { NewDonationPage } from "./pages/NewDonationPage/NewDonationPage";
import { CampaignsPage } from "./pages/CampaignsPage/CampaignsPage";
import { ProgramsPage } from "./pages/ProgramsPage/ProgramsPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignOutPage } from "./pages/SignOutPage/SignOutPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={routes.getNewDonationRoute()} element={<NewDonationPage />} />
        <Route path={routes.getSingUpRoute()} element={<SignUpPage />} />
        <Route path={routes.getSignInRoute()} element={<SignInPage />} />
        <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />

        <Route path={routes.getViewCampaignsRoute} element={<CampaignsPage />} />
        <Route
          path={routes.getViewDonationRoute(routes.viewDonationParams)}
          element={<DonationPage />}
        />
        <Route path="/programs" element={<ProgramsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
