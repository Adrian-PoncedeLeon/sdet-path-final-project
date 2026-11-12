require("dotenv/config");

module.exports = {
  default: {
    paths: ["tests/bdd/features/**/*.feature"],
    requireModule: ["tsx/cjs"],
    require: [
      "tests/bdd/support/**/*.ts",
      "tests/bdd/step-definitions/**/*.ts",
    ],
    format: [
      "progress",
      "html:reports/bdd/cucumber-report.html",
      "message:test-results/bdd/cucumber-messages.ndjson",
    ],
    worldParameters: {
      browserName: "chromium",
    },
    publishQuiet: true,
  },
};
