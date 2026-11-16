# SDET Path - Final Project

A TypeScript test automation framework developed as a course final project. It
demonstrates maintainable automation across web UI, REST API, Android mobile,
and independent BDD modules, with reusable test components, schema validation,
test reports, and CI execution.

## Test modules

| Module | Application / scope | Tooling | Current coverage |
|---|---|---|---:|
| UI | SauceDemo desktop browser | Playwright Test | 6 test cases |
| API | Restful Booker | Playwright API, AJV | 5 tests |
| Mobile | SauceDemo in Android Chrome | Appium, WebdriverIO | 3 tests |
| BDD | SauceDemo login and cart features | Cucumber, Gherkin, Playwright | 3 scenarios |

The UI, API, and BDD modules use separate configurations and reporting
locations. BDD owns its own Page Objects and support code rather than importing
test components from the other modules.

## Technologies and design

- **TypeScript** for the test framework and configuration.
- **Playwright Test** for browser UI and REST API automation.
- **Appium**, **WebdriverIO**, and UiAutomator2 for Android Chrome automation.
- **Cucumber** and **Gherkin** for independent BDD features and step definitions.
- **AJV** for JSON Schema validation of booking data.
- **Git and GitHub** for version control and repository hosting.
- **GitHub Actions** for parallel UI and API CI jobs and downloadable artifacts.

The project applies Page Object Model to UI, Mobile, and BDD interactions,
reusable fixtures and a `BookingClient` for API operations, data-driven UI
login cases, and separate module configurations.

## Project structure

```text
.
├── .github/workflows/       # GitHub Actions UI/API workflow
├── docs/                    # Development prompt documentation
├── reports/                 # Generated, module-specific HTML reports
├── test-results/            # Generated test output and failure evidence
├── tests/
│   ├── api/                 # Booking tests, client, data, schema, fixtures
│   ├── bdd/                 # Features, BDD Page Objects, steps, hooks, World
│   ├── mobile/              # Android specs, Page Objects, support and types
│   └── ui/                  # Feature-organized UI specs, Page Objects, support
├── .env.example             # Environment-variable placeholders
├── package.json             # Dependencies and npm scripts
├── playwright.config.ts     # Playwright UI configuration
├── playwright.api.config.ts # Playwright API configuration
└── wdio.android.conf.ts     # WebdriverIO / Appium Android configuration
```

Generated reports and results are ignored by Git. Each Playwright suite has its
own report and result folders.

## Installation and configuration

### Prerequisites

- Node.js 22 and npm.
- Chromium for local Playwright UI and BDD runs.
- For Mobile: Java/JDK, Android SDK command-line tools and `adb`, Android
  Studio with an Android Virtual Device (AVD), and Chrome installed in the
  emulator. The configured Appium UiAutomator2 driver must be available.

Install dependencies and the local Chromium browser:

```sh
npm ci
npx playwright install chromium
```

For the Appium driver setup, see
[tests/mobile/README.md](tests/mobile/README.md).

### Environment variables

Copy the root `.env.example` to `.env` and set values locally. The `.env` file
is ignored by Git; do not commit or share it. The framework loads it through
dotenv in the Playwright, Cucumber, and WebdriverIO configurations.

Variables used by the suites:

| Variables | Used for |
|---|---|
| `SAUCEDEMO_STANDARD_USERNAME`, `SAUCEDEMO_STANDARD_PASSWORD` | Standard SauceDemo login for UI, Mobile, and BDD |
| `SAUCEDEMO_LOCKED_OUT_USERNAME`, `SAUCEDEMO_LOCKED_OUT_PASSWORD` | Locked-out login for UI, Mobile, and BDD |
| `SAUCEDEMO_INVALID_USERNAME`, `SAUCEDEMO_INVALID_PASSWORD` | Invalid-login cases in UI tests |
| `BOOKER_USERNAME`, `BOOKER_PASSWORD` | Authenticated API operations and booking cleanup |
| `ANDROID_AVD_NAME` | Exact installed Android emulator name for Mobile runs |

No credential values belong in this README or in source control.

### GitHub Actions secrets

Create repository Actions secrets with the same names as the environment
variables above that are needed by CI:

- UI: all six `SAUCEDEMO_*` variables.
- API: `BOOKER_USERNAME` and `BOOKER_PASSWORD`.

The workflow maps these secrets to job environment variables and does not
print them. GitHub does not provide repository secrets to workflows from fork
pull requests; those test jobs are skipped for fork PRs.

## Running tests

Run each suite independently from the repository root:

```sh
npm run test:ui
npm run test:api
npm run test:mobile
npm run test:bdd
```

The corresponding discovery commands are `npm run test:ui:list`,
`npm run test:api:list`, and `npm run test:bdd:list`. Type-check scripts are
available as `npm run typecheck`, `npm run typecheck:mobile`, and
`npm run typecheck:bdd`.

## Reporting and CI

- **UI:** Playwright HTML report at `reports/ui/index.html`; output and failure
  screenshots under `test-results/ui/`. Screenshots are captured only on
  failure. Tracing is configured for the first retry; no retries are currently
  configured, so a first-attempt failure does not by itself produce a trace.
- **API:** independent Playwright HTML report at `reports/api/index.html` and
  error context under `test-results/api/`. API tests do not produce browser
  screenshots or traces.
- **BDD:** Cucumber HTML report at `reports/bdd/cucumber-report.html`, plus
  Cucumber Messages at `test-results/bdd/cucumber-messages.ndjson`. A screenshot
  is attached when a scenario fails.
- **Mobile:** WebdriverIO uses the spec reporter and writes logs/results under
  `test-results/mobile/`; it does not currently have an HTML reporter.

The **Final project - UI and API Tests** workflow
([workflow file](.github/workflows/ui-api-tests.yml)) runs on pull requests
targeting `main`, pushes to `main`, and manual dispatch. Independent UI and API
jobs use the existing npm scripts. The workflow does not run Mobile or BDD.
Each job uploads its report and test-results folder even when tests fail;
artifacts are retained for 14 days. To download them, open the workflow run in
GitHub's **Actions** tab and select the artifact under **Artifacts**.

**Current test status:** one UI assertion, one API assertion, and one BDD
scenario have deliberately incorrect expectations to demonstrate failure
reporting. Those suites are therefore expected to report a failure until the
expectations are corrected. The workflow runs only UI and API.

## AI-assisted development

GitHub Copilot was used to support architecture, implementation, refactoring,
debugging, configuration, and documentation. Technical decisions, approvals,
and validation remained under human supervision. Historical project prompts
and clearly labeled reconstructions are documented in
[docs/PROMPTS.md](docs/PROMPTS.md).
