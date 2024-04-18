import { useDesignToken } from "../rules";
import { afterAll, describe, it } from "vitest";
import { RuleTester } from "@typescript-eslint/rule-tester";

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run("vars-name/use-design-token", useDesignToken, {
  valid: [
    {
      filename: "Component.tsx",
      code: "<Button paddingTop={theme.padding.top} />",
    },
  ],
  invalid: [
    {
      filename: "Component.tsx",
      // eslint-disable-next-line quotes
      code: '<Button paddingTop="8px" />',
      errors: [
        {
          messageId: "use_design_token",
        },
      ],
    },
  ],
});
