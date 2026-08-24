import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages serves this at https://ivanovskiii.github.io/loka-cover-builder/,
  // not a domain root, so asset URLs need the repo name as a base path.
  base: "/loka-cover-builder/",
  plugins: [react()],
  server: { port: 5173, open: true },
});
