import { TSESLint } from "@typescript-eslint/utils";
// @ts-expect-error
import * as styledSystem from "styled-system";
import ignore from "ignore";
import { MessageId } from "./types";
import { messages } from "./messages";

type Options = Array<{
  ignoreFilenames?: string[];
}>;

const styledSystemKeys = Object.keys(styledSystem);
// 省略記法は使わなくてもいいかなと思いつつ、一旦全て取得しておく
const propNames = styledSystemKeys
  .map((key) => {
    return styledSystem[key].propNames;
  })
  .filter((propNames) => propNames !== undefined)
  .flat();

/**
 * デザイントークンを使ってください！
 */
export const useDesignToken: TSESLint.RuleModule<MessageId, Options> = {
  meta: {
    type: "problem",
    docs: {
      description: "デザイントークンを使ってください！",
      recommended: "recommended",
      url: "",
    },
    schema: [
      {
        type: "object",
        properties: {
          ignoreFilenames: {
            type: "array",
            items: {
              type: "string",
            },
          },
        },
        additionalProperties: false,
      },
    ],
    messages,
  },
  defaultOptions: [],
  create(context) {
    const { filename, options } = context;
    const ignoreFilenames = options[0]?.ignoreFilenames ?? [];
    const ig = ignore().add(ignoreFilenames);
    if (ig.ignores(filename)) {
      return {};
    }

    return {
      JSXOpeningElement(node) {
        node.attributes.forEach((attribute) => {
          if (attribute.type === "JSXAttribute") {
            const value = attribute.value;
            const key = attribute.name.name;
            if (propNames.includes(key) && value?.type === "Literal") {
              context.report({
                node: value,
                messageId: "use_design_token",
              });
            }

            if (value && value.type === "JSXExpressionContainer") {
              const expression = value.expression;
              if (
                expression.type === "MemberExpression" &&
                expression.object.type === "MemberExpression" &&
                expression.object.object.type === "Identifier"
              ) {
                const variableName = expression.object.object.name;
                if (!variableName.startsWith("theme")) {
                  context.report({
                    node: expression,
                    messageId: "use_design_token",
                  });
                }
              }
            }
          }
        });
      },
    };
  },
};
