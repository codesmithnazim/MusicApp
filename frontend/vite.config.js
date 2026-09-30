import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import postcssPresetEnv from "postcss-preset-env";
import autoprefixer from "autoprefixer";
import createTransformer from "tailwind-group-variant";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      // Tell Tailwind to transform your files using the group variant expander before scanning
      content: {
        transform: createTransformer({ separatorChar: " " }),
      },
    }),
    postcssPresetEnv({ stage: 2 }),
    autoprefixer(),
  ],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:3000",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
