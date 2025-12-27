import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// Copy image.png to public folder if it doesn't exist
const publicDir = path.resolve(__dirname, "public");
const sourceImage = path.resolve(__dirname, "image.png");
const destImage = path.join(publicDir, "image.png");

if (fs.existsSync(sourceImage) && !fs.existsSync(destImage)) {
  fs.copyFileSync(sourceImage, destImage);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
