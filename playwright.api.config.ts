import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/api",
  outputDir: "./test-results/api",
  reporter: [["html", { outputFolder: "./reports/api", open: "never" }]],
  use: {
    baseURL: "https://restful-booker.herokuapp.com",
  },
});
