import "dotenv/config";

const avdName = process.env.ANDROID_AVD_NAME?.trim();
if (!avdName) {
  throw new Error(
    "Set ANDROID_AVD_NAME in the project .env file to the name of an installed Android Virtual Device.",
  );
}

const config: WebdriverIO.Config = {
  runner: "local",
  specs: ["./tests/mobile/specs/**/*.ts"],
  maxInstances: 1,
  logLevel: "warn",
  outputDir: "./test-results/mobile",
  baseUrl: "https://www.saucedemo.com",
  framework: "mocha",
  reporters: ["spec"],
  services: [
    [
      "appium",
      {
        command: "appium",
        args: {
          address: "127.0.0.1",
          port: 4723,
          allowInsecure: "uiautomator2:chromedriver_autodownload",
        },
      },
    ],
  ],
  mochaOpts: {
    timeout: 60_000,
  },
  capabilities: [
    {
      platformName: "Android",
      browserName: "Chrome",
      "appium:automationName": "UiAutomator2",
      "appium:deviceName": avdName,
      "appium:avd": avdName,
      "appium:avdLaunchTimeout": 120_000,
      "appium:avdReadyTimeout": 120_000,
      "appium:chromedriverAutodownload": true,
    },
  ],
};

export { config };
