import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { trpcRouter } from "./router";
import cors from "cors";
import { applyTrpcToExpressApp } from "./lib/trpc";

const expressApp = express();

expressApp.use(cors());

expressApp.get("/ping", (req, res) => {
  res.send("pong");
});

applyTrpcToExpressApp(expressApp, trpcRouter);

expressApp.listen(3000, () => {
  console.info("Listening at http://localhost:3000");
});
