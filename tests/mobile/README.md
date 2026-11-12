# Mobile browser tests

This suite runs SauceDemo in Chrome on an Android device using WebdriverIO,
Appium, and the UiAutomator2 driver.

## Prerequisites

- Node.js and npm
- Java/JDK and Android SDK command-line tools, including `adb`
- An Android Virtual Device (AVD) created in Android Studio with a compatible
  Android system image
- Chrome installed on the Android device
- Appium's UiAutomator2 driver (install with
  `npx appium driver install uiautomator2`)
- SauceDemo variables configured in the root `.env`:
  `SAUCEDEMO_STANDARD_USERNAME`, `SAUCEDEMO_STANDARD_PASSWORD`,
  `SAUCEDEMO_LOCKED_OUT_USERNAME`, and `SAUCEDEMO_LOCKED_OUT_PASSWORD`

Set `ANDROID_AVD_NAME` in the root `.env` to the exact AVD name shown by
`emulator -list-avds`. The current local configuration selects `Pixel_9_Pro`.
Appium launches that AVD and waits for it to boot before starting Chrome.

Ensure `ANDROID_HOME` points to the Android SDK and that the SDK's `emulator`
and `platform-tools` directories are on `PATH`. Android Studio's Device
Manager can be used to create or start an AVD. If the emulator is already
running, Appium will attach to the selected AVD.

Run the suite with `npm run test:mobile`. Results are written to the ignored
`test-results/mobile` directory. The WDIO configuration starts a local Appium
server and enables Appium's ChromeDriver auto-download for device Chrome.
