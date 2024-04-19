import { useDesignToken } from "./rules";

export = {
  rules: {
    "use-design-token": useDesignToken,
  },
  configs: {
    all: {
      plugins: ["design-tokens"],
      rules: {
        "design-tokens/use-design-token": "error",
      },
    },
  },
};
