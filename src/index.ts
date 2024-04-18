import { useDesignToken } from "./rules";

export = {
  rules: {
    "use-design-token": useDesignToken,
  },
  configs: {
    all: {
      plugins: ["design-tokens"],
      rules: {
        "vars-name/use-design-token": "error",
      },
    },
  },
};
