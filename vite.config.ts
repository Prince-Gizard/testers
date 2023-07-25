import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import checker from "vite-plugin-checker"
import { VitePWA } from "vite-plugin-pwa"
import svgrPlugin from "vite-plugin-svgr"
import viteTsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [
    react(),
    checker({
      overlay: true,
      typescript: true,
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
    VitePWA({
      registerType: "prompt",
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    port: 4000,
  },
  build: {
    outDir: "./build",
  },
  base: '',
})
