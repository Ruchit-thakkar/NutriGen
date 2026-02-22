import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      // Ensure these exist in your /public folder!
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "NutriGen",
        short_name: "NutriGen",
        description: "AI-Powered Nutrition & Fitness Tracker",
        theme_color: "#0f172a", // Matches your slate-900 dark theme
        background_color: "#f8fafc", // Matches your slate-50 background
        display: "standalone", // Removes the browser URL bar
        orientation: "portrait",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
