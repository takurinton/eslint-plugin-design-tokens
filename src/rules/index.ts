import { TSESLint } from "@typescript-eslint/utils";
import { MessageId } from "./types";
import { messages } from "./messages";

/**
 * デザイントークンを使ってください！
 */
export const useDesignToken: TSESLint.RuleModule<MessageId, []> = {
  meta: {
    type: "problem",
    docs: {
      description: "デザイントークンを使ってください！",
      recommended: "recommended",
      url: "",
    },
    schema: [],
    messages,
  },
  defaultOptions: [],
  create(context) {
    const { filename } = context;
    const isTSX = filename.endsWith(".tsx");
    // .ts を除外するかどうかは要検討
    if (!isTSX) {
      return {};
    }
    return {
      JSXOpeningElement(node) {
        node.attributes.forEach((attribute) => {
          if (attribute.type === "JSXAttribute") {
            const value = attribute.value;
            if (value?.type === "Literal") {
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
