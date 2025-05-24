import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

import App from "./App.tsx";
import { TrpcProvider } from "./lib/trpc.tsx";
import { BrowserRouter } from "react-router";
import { GeneralContextProvider } from "./lib/context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TrpcProvider>
      <GeneralContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GeneralContextProvider>
    </TrpcProvider>
  </StrictMode>
);
