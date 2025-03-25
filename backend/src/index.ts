import express from "express";
import { trpcRouter } from "./router";
import cors from "cors";
import { applyTrpcToExpressApp } from "./lib/trpc";
import { type AppContext, createAppContext } from "./lib/context";
import { applyPassportToExpressApp } from "./lib/passport";
import { env } from "./lib/env";

(async () => {
  let ctx: AppContext | null = null;
  try {
    ctx = createAppContext();
    const expressApp = express();

    expressApp.use(cors());

    expressApp.get("/ping", (req, res) => {
      res.send("pong");
    });
    applyPassportToExpressApp(expressApp, ctx);
    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(3000, () => {
      console.info(`Listening at http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.log(error);
    await ctx?.stop();
  }
})();
