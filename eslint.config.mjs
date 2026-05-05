import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Ukrainian content pages often contain quotes/apostrophes in JSX text.
      // This rule is noisy and doesn't affect runtime correctness.
      "react/no-unescaped-entities": "off",
      // This rule is too strict for our UI state sync patterns (dialogs, galleries, maps).
      "react-hooks/set-state-in-effect": "off",
      // This repo uses Google Maps and other libraries where `any` is pragmatic.
      "@typescript-eslint/no-explicit-any": "off",
      // Some components intentionally omit deps to avoid re-attaching heavy listeners.
      "react-hooks/exhaustive-deps": "warn",
      // We intentionally use aria-expanded on inputs in our custom combobox UI.
      "jsx-a11y/role-supports-aria-props": "off",
    },
  },
]);

export default eslintConfig;
