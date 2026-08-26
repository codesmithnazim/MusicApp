
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Never lint build output or coverage reports
  globalIgnores(["dist/", "coverage/", "build/"]),

  {
    files: ["**/*.{js,jsx}"],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended],
    plugins: { "react-refresh": reactRefresh },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",      // Vite/React code is ESM, always import/export
      globals: globals.browser,  // window, document, fetch, localStorage, etc.
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // Warns if a file mixes component exports with other exports —
      // that combo breaks Vite's Fast Refresh
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // "no-console": "off",
      // "eqeqeq": "error",
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  // Must be last — turns off stylistic ESLint rules that fight Prettier
  eslintConfigPrettier,
]);