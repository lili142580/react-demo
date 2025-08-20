import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
      {
        find: "@/pages",
        replacement: resolve(__dirname, "src/pages"),
      },
    ],
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/prod-api": {
        target: "https://vue.ruoyi.vip/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/prod-api"),
      },
    },
  },
});
