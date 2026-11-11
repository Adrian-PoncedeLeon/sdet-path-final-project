import { test as base, expect } from "@playwright/test";

interface LoginCredentials {
  username: string;
  password: string;
}

interface UiFixtures {
  uiCredentials: {
    standardUser: LoginCredentials;
    lockedOutUser: LoginCredentials;
    invalidUser: LoginCredentials;
    invalidPassword: LoginCredentials;
  };
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. Set it in the project .env file or process environment.`,
    );
  }

  return value;
}

export const test = base.extend<UiFixtures>({
  uiCredentials: async ({}, use) => {
    await use({
      standardUser: {
        username: requiredEnv("SAUCEDEMO_STANDARD_USERNAME"),
        password: requiredEnv("SAUCEDEMO_STANDARD_PASSWORD"),
      },
      lockedOutUser: {
        username: requiredEnv("SAUCEDEMO_LOCKED_OUT_USERNAME"),
        password: requiredEnv("SAUCEDEMO_LOCKED_OUT_PASSWORD"),
      },
      invalidUser: {
        username: requiredEnv("SAUCEDEMO_INVALID_USERNAME"),
        password: requiredEnv("SAUCEDEMO_STANDARD_PASSWORD"),
      },
      invalidPassword: {
        username: requiredEnv("SAUCEDEMO_STANDARD_USERNAME"),
        password: requiredEnv("SAUCEDEMO_INVALID_PASSWORD"),
      },
    });
  },
});

export { expect };
export type { LoginCredentials };
