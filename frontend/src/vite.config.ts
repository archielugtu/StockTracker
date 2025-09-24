// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // optional, mirrors CRA src imports
    },
  },
  server: {
    port: 3000, // same as CRA default
  },
})
