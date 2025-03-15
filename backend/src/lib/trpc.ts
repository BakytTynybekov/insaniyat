import { initTRPC } from "@trpc/server";
import { type Express } from "express";
import { type TrpcRouter } from "../router";
import * as trpcExpress from "@trpc/server/adapters/express";
import { type AppContext } from "./context";
export const trpc = initTRPC.context<AppContext>().create();
export const applyTrpcToExpressApp = async (
  expressApp: Express,
  appContext: AppContext,
  trpcRouter: TrpcRouter
) => {
  expressApp.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: () => appContext,
    })
  );
};
