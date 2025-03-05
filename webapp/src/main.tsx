import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TrpcProvider } from "./lib/trpc.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TrpcProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TrpcProvider>
  </StrictMode>
);
