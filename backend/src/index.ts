import express from "express";
import { trpcRouter } from "./router";
import cors from "cors";
import { applyTrpcToExpressApp } from "./lib/trpc";
import { createAppContext } from "./lib/context";
import { applyPassportToExpressApp } from "./lib/passport";
import { env } from "./lib/env";
import { presetDb } from "./scripts/presetDb";
import { applyServeWebApp } from "./lib/serveWebApp";

const startServer = async () => {
  const ctx = createAppContext();
  const expressApp = express();

  // 1. Базовые middleware
  expressApp.use(cors());
  expressApp.use(express.json());

  // 2. Тестовые роуты (должны работать сразу)
  expressApp.get("/api/test", (req, res) => {
    console.log("Test route hit"); // Добавьте это
    res.json({ status: "API works" });
  });

  expressApp.get("/ping", (req, res) => {
    res.send("pong");
  });

  // 3. Инициализация базы данных
  try {
    await presetDb(ctx);
  } catch (error) {
    console.error("DB initialization failed:", error);
  }

  // 4. Настройка аутентификации
  applyPassportToExpressApp(expressApp, ctx);

  // 5. Настройка tRPC
  await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

  // 6. Раздача фронтенда (должно быть последним)
  await applyServeWebApp(expressApp);

  // 7. Запуск сервера
  expressApp.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
    console.log("Test routes:");
    console.log(`- http://localhost:${env.PORT}/api/test`);
    console.log(`- http://localhost:${env.PORT}/ping`);
  });

  return { app: expressApp, context: ctx };
};

// Запуск только если не в production (для Vercel)
if (process.env.NODE_ENV !== "production") {
  startServer().catch((err) => {
    console.error("Server startup error:", err);
    process.exit(1);
  });
}

// Экспорт для Vercel
export default startServer;
