import path from "path";
import { promises as fs } from "fs";
import express, { type Express } from "express";

const WEBAPP_DIST_PATH = path.resolve(__dirname, "../../../webapp/dist");

export const applyServeWebApp = async (expressApp: Express) => {
  try {
    await fs.access(WEBAPP_DIST_PATH);
    console.log("✅ Webapp dist exists:", WEBAPP_DIST_PATH);

    // Раздача статики
    expressApp.use(express.static(WEBAPP_DIST_PATH));

    // Fallback для SPA (исправленная версия)
    expressApp.get("*", (req, res) => {
      const indexPath = path.join(WEBAPP_DIST_PATH, "index.html");
      console.log(`🔄 Serving SPA from: ${indexPath}`);

      // Правильный способ без указания root
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error("❌ Failed to send index.html:", err);
          res.status(500).send("Internal Server Error");
        }
      });
    });
  } catch (error) {
    console.error("❌ Webapp dist missing:", WEBAPP_DIST_PATH);
    if (process.env.NODE_ENV !== "production") {
      expressApp.get("*", (req, res) => {
        res.status(500).send(`
          <h1>Development Error</h1>
          <p>Webapp not built. Run:</p>
          <pre>cd webapp && pnpm build</pre>
          <p>Path expected: ${WEBAPP_DIST_PATH}</p>
        `);
      });
    }
  }
};
