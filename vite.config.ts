import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/contacts-search/",
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
