import { Route, Routes, useLocation } from "react-router";
import { DonationPage } from "./pages/DonationPage/DonationPage";
import MainPage from "./pages/MainPage/MainPage";
import { Header } from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { getViewCampaingRoute, viewDonationParams } from "./lib/routes";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <Header />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route
          path={getViewCampaingRoute(viewDonationParams)}
          element={<DonationPage />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
