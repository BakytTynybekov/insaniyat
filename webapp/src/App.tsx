import { Route, Routes } from "react-router";
import { DonationPage } from "./pages/fundraisers/DonationPage/DonationPage";
import MainPage from "./pages/MainPage/MainPage";
import { Header } from "./components/header/Header";
import Footer from "./components/footer/Footer";
import * as routes from "./lib/routes";
import { NewDonationPage } from "./pages/fundraisers/NewDonationPage/NewDonationPage";
import { CampaignsPage } from "./pages/fundraisers/CampaignsPage/CampaignsPage";
import { SignUpPage } from "./pages/auth/SignUpPage/SignUpPage";
import RequestPasswordReset from "./pages/RequestPasswordReset/RequestPasswordReset";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import { ProgramPage } from "./pages/programs/ProgramPage/ProgramPage";
import { NewProgramPage } from "./pages/programs/NewProgramPage/NewProgramPage";
import { Profile } from "./pages/profile/ProfilePage/Profile";
import { EditProfilePage } from "./pages/profile/EditProfile/EditProfile";
import { EditProgramPage } from "./pages/programs/EditProgramPage/EditProgramPage";
import { MyDonatsProfilePage } from "./pages/profile/MyDonatsProfile/MyDonatsProfile";
import { MySubscriptionsPage } from "./pages/profile/MySubscriptionsPage/MySubscriptionsPage";
import { GetHelp } from "./pages/other/GetHelp/GetHelp";
import { NotFoundPage } from "./pages/other/NotFoundPage/NotFoundPage";
import { SignOutPage } from "./pages/auth/SignOutPage/SignOutPage";
import { SignInPage } from "./pages/auth/SignInPage/SignInPage";
import { AllDonations } from "./pages/profile/allDonations/AllDonations";
import { ProgramsPage } from "./pages/programs/ProgramsPage/ProgramsPage";
import { MonthlyDonations } from "./pages/reports/MonthlyReceipts";
import { MonthlyReports } from "./pages/reports/MonthlyReports";
import { NewReportSpendings } from "./pages/reports/NewReportSpendings";
import { NewReportIncomes } from "./pages/reports/NewReportIncomes";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="edit" element={<EditProfilePage />} />
          {/* <Route path="edit" element={<EditProfile />} /> */}

          <Route path="donats" element={<MyDonatsProfilePage />} />
          <Route path="subscriptions" element={<MySubscriptionsPage />} />
          <Route path="all-donats" element={<AllDonations />} />
        </Route>
        <Route path={routes.getNewDonationRoute()} element={<NewDonationPage />} />
        <Route path={routes.getNewProgramRoute()} element={<NewProgramPage />} />
        <Route
          path={routes.getEditProgramRoute(routes.editProgramRouteParams)}
          element={<EditProgramPage />}
        />
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
        <Route path="/get-help" element={<GetHelp />} />
        <Route path="/monthly-receipts/new" element={<NewReportIncomes />} />
        <Route path="/monthly-receipts" element={<MonthlyDonations />} />
        <Route path="/monthly-reports/new" element={<NewReportSpendings />} />
        <Route path="/monthly-reports" element={<MonthlyReports />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
