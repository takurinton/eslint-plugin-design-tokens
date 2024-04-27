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

ruleTester.run("design-token/use-design-token", useDesignToken, {
  valid: [
    {
      filename: "Component.tsx",
      code: "<Button paddingTop={theme.padding.top} />",
    },
    // 絶対パス
    {
      filename: `${process.cwd()}/src/Component.tsx`,
      code: "<Button paddingTop={theme.padding.top} />",
    },
    {
      // styled-system に存在しないプロパティは無視する
      filename: "Component.tsx",
      code: '<Button foo="bar" />',
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
    {
      filename: "Component.tsx",
      code: '<Box justifyContent="flex-start" alignItems="center" />',
      options: [{ ignoreKeys: ["justifyContent", "alignItems"] }],
    },
    {
      filename: "Component.tsx",
      code: '<Box textOverflow="ellipsis" flexDirection="column" alignItems="flex-start" justifyContent="flex-start" />',
      options: [{ onlyCheckDefaultTheme: true }],
    },
    {
      filename: "Component.tsx",
      code: '<Box background="transparent" />',
      options: [{ onlyCheckDefaultTheme: true }],
    },
    {
      filename: "Component.tsx",
      code: '<Box background="inherit" />',
      options: [{ onlyCheckDefaultTheme: true }],
    },
    {
      filename: "Component.tsx",
      code: '<Box background="unset" />',
      options: [{ onlyCheckDefaultTheme: true }],
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
