import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Vite Configuration - SalusDev Centro de Comando
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: parseInt(process.env.PORT || "8443"),
  },
  preview: {
    host: true,
    port: parseInt(process.env.PORT || "8443"),
  },
})
