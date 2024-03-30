const { RuleTester } = require("eslint");
const rule = require("../no-reassignement");

const ruleTester = new RuleTester();

ruleTester.run("no-param-reassign", rule, {
  valid: [
    {
      code: "function test(param) { const localVar = param; }",
      parserOptions: { ecmaVersion: 6 },
    },
    {
      code: "const test = (param) => { const localVar = param; }",
      parserOptions: { ecmaVersion: 6 },
    },
  ],
  invalid: [
    {
      code: "function test(param) { param = 10; }",
      errors: [{ messageId: "reassignFunctionParameter" }],
    },
    {
      code: "const test = (param) => { param = 10; }",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ messageId: "reassignFunctionParameter" }],
    },
  ],
});
