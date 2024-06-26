module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    "no-extra-semi": "error",
    quotes: "off",
    "space-before-blocks": ["error", { functions: "always" }],
    "no-undef": ["off"],
  },
};
