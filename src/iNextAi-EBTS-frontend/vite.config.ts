import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import environment from "vite-plugin-environment";
import dotenv from "dotenv";
import { fileURLToPath, URL } from "url";

dotenv.config({ path: '../../.env' });

export default defineConfig(({ mode }) => ({
  build: {
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(
          new URL("../declarations", import.meta.url)
        ),
      },
      { 
        find: "@", 
        replacement: fileURLToPath(new URL("./src", import.meta.url))
      },
      { 
        find: "@LandingPageUI", 
        replacement: fileURLToPath(new URL("./src/components/LandingPageUI", import.meta.url))
      },
    ],
    dedupe: ['@dfinity/agent'],
  },
}));
