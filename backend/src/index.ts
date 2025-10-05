import express from "express";
import { trpcRouter } from "./router";
import cors from "cors";
import { applyTrpcToExpressApp } from "./lib/trpc";
import { createAppContext } from "./lib/context";
import { applyPassportToExpressApp } from "./lib/passport";
import { env } from "./lib/env";
import { presetDb } from "./scripts/presetDb";

const startServer = async () => {
  const ctx = createAppContext();
  const expressApp = express();

  expressApp.use(cors());
  expressApp.use(express.json());

  expressApp.get("/ping", (req, res) => {
    res.send("pong");
  });

  try {
    await presetDb(ctx);
  } catch (error) {
    console.error("DB initialization failed:", error);
  }

  applyPassportToExpressApp(expressApp, ctx);

  await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

  const port = env.PORT || 3000;

  expressApp.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  return { app: expressApp, context: ctx };
};

startServer().catch((err) => {
  console.error("Server startup error:", err);
  process.exit(1);
});

// Экспорт для Vercel
export default startServer;
