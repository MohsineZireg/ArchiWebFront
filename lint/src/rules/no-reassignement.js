module.exports = {
  meta: {
    messages: {
      reassignFunctionParameter: "Assignment to function parameter '{{name}}'.",
    },
  },

  create(context) {
    return {
      FunctionDeclaration(node) {
        if (!node.body || !node.body.body) return;

        const parameterNames = new Set(node.params ? node.params.map(({ name }) => name) : []);
        node.body.body.forEach((statement) => {
          if (
            statement.type === "ExpressionStatement"
            && statement.expression.type === "AssignmentExpression"
          ) {
            const { left } = statement.expression;
            if (left.type === "Identifier" && parameterNames.has(left.name)) {
              context.report({
                node,
                messageId: "reassignFunctionParameter",
                data: {
                  name: left.name,
                },
              });
            }
          }
        });
      },
      VariableDeclaration(node) {
        if (
          node.declarations[0].init
          && node.declarations[0].init.type === "ArrowFunctionExpression"
          && node.declarations[0].init.body.body
        ) {
          const parameterNames = node.declarations[0].init.params ? node.declarations[0].init.params.map((param) => param.name) : [];
          node.declarations[0].init.body.body.forEach((statement) => {
            if (
              statement.type === "ExpressionStatement"
              && statement.expression.type === "AssignmentExpression"
              && statement.expression.left.type === "Identifier"
              && parameterNames.includes(statement.expression.left.name)
            ) {
              context.report({
                node,
                messageId: "reassignFunctionParameter",
                data: {
                  name: statement.expression.left.name,
                },
              });
            }
          });
        }
      },
    };
  },
};
