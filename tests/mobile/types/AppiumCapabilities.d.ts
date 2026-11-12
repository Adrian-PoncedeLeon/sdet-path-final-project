export {};

declare global {
  namespace WebdriverIO {
    interface Capabilities {
      "appium:avd"?: string;
      "appium:avdLaunchTimeout"?: number;
      "appium:avdReadyTimeout"?: number;
      "appium:chromedriverAutodownload"?: boolean;
    }
  }
}
