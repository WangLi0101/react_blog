/// <reference types="node" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import svgr from "vite-plugin-svgr";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 7748,
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {},
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router"],
          antd: ["antd", "@ant-design/icons"],
          markdown: [
            "react-markdown",
            "remark",
            "remark-gfm",
            "remark-math",
            "rehype-raw",
            "rehype-katex",
            "katex",
          ],
          editor: ["for-editor", "react-syntax-highlighter"],
          ai: ["@google/generative-ai"],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
});
