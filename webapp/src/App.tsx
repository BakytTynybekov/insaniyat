import { Route, Routes, useLocation } from "react-router";
import { DonationPage } from "./pages/DonationPage/DonationPage";
import MainPage from "./pages/MainPage/MainPage";
import { Header } from "./components/header/Header";
import Footer from "./components/footer/Footer";
import * as routes from "./lib/routes";
import { useEffect } from "react";
import { NewDonationPage } from "./pages/NewDonationPage/NewDonationPage";

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
        <Route path={routes.getNewDonationRoute()} element={<NewDonationPage />} />

        <Route
          path={routes.getViewDonationRoute(routes.viewDonationParams)}
          element={<DonationPage />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
