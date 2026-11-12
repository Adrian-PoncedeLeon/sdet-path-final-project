import assert from "node:assert/strict";
import { Given, Then, When } from "@cucumber/cucumber";
import { BddWorld } from "../support/world";

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Set it in the project .env file or process environment.`,
    );
  }

  return value;
}

function loginPage(world: BddWorld) {
  if (!world.loginPage) {
    throw new Error("BDD LoginPage is not initialized. Check the scenario hooks.");
  }

  return world.loginPage;
}

Given("I am on the SauceDemo login page", async function (this: BddWorld) {
  await loginPage(this).open();
});

When("I log in as the standard user", async function (this: BddWorld) {
  const username = requiredEnv("SAUCEDEMO_STANDARD_USERNAME");
  const password = requiredEnv("SAUCEDEMO_STANDARD_PASSWORD");
  await loginPage(this).login(username, password);
});

When("I log in as the locked-out user", async function (this: BddWorld) {
  const username = requiredEnv("SAUCEDEMO_LOCKED_OUT_USERNAME");
  const password = requiredEnv("SAUCEDEMO_LOCKED_OUT_PASSWORD");
  await loginPage(this).login(username, password);
});

Then("I should see the products page", async function (this: BddWorld) {
  assert.equal(await loginPage(this).getPageTitle(), "Products");
});

Then("I should see a locked-out error", async function (this: BddWorld) {
  assert.match(
    (await loginPage(this).getErrorMessage()) ?? "",
    /Sorry, this user has been locked out\./,
  );
});
