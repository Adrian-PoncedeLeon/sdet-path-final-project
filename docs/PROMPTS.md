# Development prompts

This document records user prompts that guided the framework's development.
Historical conversation context was partly summarized, so the entries below
distinguish exact prompt excerpts from reconstructed summaries. A quoted
excerpt is verbatim but may omit other parts of its original message.

## Project structure

**Original prompt excerpt (verbatim):**

> I want you to create the structure for the whole project. I want a folder
> for UI tests, other for API tests, other for mobile tests, other for BBD
> tests. If needed each of this a subfolder for the reports, test results,
> etc.

**Purpose:** Establish separate test modules and organize generated output.

## UI automation

**Original prompt excerpt (verbatim):**

> Implement the five UI automated tests for our framework using SauceDemo as
> the application under test.

The prompt specified TypeScript and Playwright Test, Page Object Model,
async/await, parameterized invalid-login scenarios, reusable methods, reliable
locators, and meaningful assertions. It named successful login, locked-out
login, invalid credentials, cart contents, and ascending price sorting.

**Original prompt excerpt (verbatim):**

> Currently, all UI scenarios are implemented in a single
> `sauce-demo.spec.ts` file. I want a more maintainable and scalable structure
> organized by feature.

The requested feature organization was `tests/ui/pages/`,
`tests/ui/auth/login.spec.ts`, `tests/ui/inventory/inventory.spec.ts`, and
`tests/ui/cart/cart.spec.ts`, preserving scenarios and avoiding duplicate
Page Objects.

**Purpose:** Build the UI scenarios and then organize them by feature.

## API automation and credentials

**Original prompt excerpt (verbatim):**

> Implement the API automation stage using the Restful Booker API, following
> the techniques and concepts from my previous API automation assignment.

The prompt required TypeScript, Playwright API testing, AJV, JSON test data,
environment-based credentials, a reusable `BookingClient`, schema validation,
positive and negative scenarios, and test independence without hardcoded
booking IDs.

**Original prompt excerpt (verbatim):**

> I need to configure the Restful Booker API credentials securely.

The request specified local `.env` values, empty `.env.example` placeholders,
Git ignore verification, dotenv loading, and no display or logging of secrets.

**Purpose:** Add isolated API coverage, then configure its credentials safely.

## Android Mobile

**Original prompt excerpt (verbatim):**

> We are starting the Mobile Testing module of this automation framework.

The prompt specified Appium, WebdriverIO, and TypeScript, requested a
maintainable architecture, dependency justification, folder/configuration
proposal, and emulator prerequisites. A follow-up prompt clarified:

> we need to be able to run the tests on an emulator

**Purpose:** Plan and implement an independent Android emulator test module.

## BDD with Cucumber

**Original prompt excerpt (verbatim):**

> We are implementing BDD with Cucumber as an independent module of this
> framework.

The prompt required BDD to remain separate from UI, API, and Mobile, with its
own dependencies, configuration, feature files, steps, hooks, and any minimal
BDD-specific Page Objects.

**Original prompt (verbatim):**

> I want an extra scenario: adds products to the cart and verifies its
> contents

**Purpose:** Establish an independent Gherkin login module and later add a
BDD-owned cart scenario.

## Reporting

**Original prompt excerpt (verbatim):**

> We are now implementing the Reporting module of our automation framework.

The request specified independent Playwright HTML reports for UI and API,
failure-only UI screenshots, failure trace retention, API diagnostics without
browser evidence, separate Cucumber HTML reporting, and future artifact
preservation in GitHub Actions. It explicitly excluded Allure and other
additional reporting tools.

**Purpose:** Configure module-specific reports and evidence with no new
reporting dependency.

## Failure-evidence demonstration

**Original prompt (verbatim):**

> now make 1 test of each suite fail and run the suites, I wan to see what we
> got on failure regarding screenshots and reports

**Purpose:** Introduce controlled failures to inspect each suite's reporting
behavior. The later decision to leave the deliberate failures in place is
recorded in conversation history.

## GitHub Actions

**Original prompt excerpt (verbatim):**

> We are now implementing GitHub Actions CI/CD for our automation framework.
>
> Automatically execute UI and API automated tests in GitHub Actions.

The prompt specified PRs to `main`, pushes to `main`, and manual dispatch;
parallel UI/API jobs; repository secrets; report and failure-evidence
artifacts; and exclusion of Mobile and BDD.

**Purpose:** Automate the UI and API suites and publish their reports as
downloadable workflow artifacts.

## Repository documentation

**Original prompt excerpt (verbatim):**

> I want you to complete the README.md file for this repository.

The request required an accurate first-visit overview, architecture and
structure, setup and execution instructions, reporting and CI details, an
AI-assisted development note, and this separate prompt record. The original
repository had no root README or `docs/` directory, so both files were created.

## Reconstructed entries

Some individual planning, approval, troubleshooting, and follow-up messages
from older phases were unavailable verbatim in the summarized history. The
descriptions labeled as purpose or reconstructed scope above are summaries,
not quotations, and are not represented as exact historical prompts.
