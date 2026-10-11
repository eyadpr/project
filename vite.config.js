import { copyFileSync, existsSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "spa-github-pages-fallback",
      closeBundle() {
        if (existsSync("dist/index.html")) {
          copyFileSync("dist/index.html", "dist/404.html");
        }
      },
    },
  ],
  base: "/",
});
