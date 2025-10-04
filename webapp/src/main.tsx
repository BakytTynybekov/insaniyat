import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

import App from "./App.tsx";
import { TrpcProvider } from "./lib/trpc.tsx";
import { BrowserRouter } from "react-router";
import { GeneralContextProvider } from "./lib/context.tsx";
import ScrollManager from "./components/ScrollManager/ScrollManager.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TrpcProvider>
      <GeneralContextProvider>
        <BrowserRouter>
          <ScrollManager />
          <App />
        </BrowserRouter>
      </GeneralContextProvider>
    </TrpcProvider>
  </StrictMode>
);
