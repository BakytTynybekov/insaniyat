import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig(function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react()],
        server: {
            port: +env.PORT,
        },
        preview: {
            port: +env.PORT,
        },
        build: {
            rollupOptions: {
                external: ["@prisma/client", ".prisma/client"],
            },
        },
        optimizeDeps: {
            exclude: ["@prisma/client"],
        },
    };
});
