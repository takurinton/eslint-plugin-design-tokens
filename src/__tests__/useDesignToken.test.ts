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
    {
      filename: "Component.stoires.tsx",
      code: '<Button paddingTop="8px" />',
      options: [{ ignoreFilenames: ["*.stoires.tsx"] }],
    },
    {
      filename: "FooIcon.tsx",
      code: '<FooIcon paddingTop="8px" />',
      options: [{ ignoreFilenames: ["*.stoires.tsx", "*Icon.tsx"] }],
    },
  ],
  invalid: [
    {
      filename: "Component.tsx",
      code: '<Button paddingTop="8px" />',
      errors: [
        {
          messageId: "use_design_token",
        },
      ],
    },
  ],
});
