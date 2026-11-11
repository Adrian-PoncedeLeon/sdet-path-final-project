import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/ui",
  outputDir: "./test-results/ui",
  reporter: [["html", { outputFolder: "./reports/ui", open: "never" }]],
  use: {
    baseURL: "https://www.saucedemo.com",
    testIdAttribute: "data-test",
    ...devices["Desktop Chrome"],
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
