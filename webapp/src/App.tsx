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
import RequestPasswordReset from "./pages/RequestPasswordReset/RequestPasswordReset";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { ProgramPage } from "./pages/ProgramPage/ProgramPage";
import { NewProgramPage } from "./pages/NewProgramPage/NewProgramPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={routes.getNewDonationRoute()} element={<NewDonationPage />} />
        <Route path={routes.getNewProgramRoute()} element={<NewProgramPage />} />
        <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
        <Route path={routes.getSignInRoute()} element={<SignInPage />} />
        <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />

        <Route path={"/reset-password/:token"} element={<ResetPassword />} />
        <Route path={routes.reqResetPasswordRoute()} element={<RequestPasswordReset />} />

        <Route path={routes.getViewCampaignsRoute} element={<CampaignsPage />} />
        <Route
          path={routes.getViewDonationRoute(routes.viewDonationParams)}
          element={<DonationPage />}
        />
        <Route
          path={routes.getViewProgramRoute(routes.viewProgramParams)}
          element={<ProgramPage />}
        />
        <Route path="/programs" element={<ProgramsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
