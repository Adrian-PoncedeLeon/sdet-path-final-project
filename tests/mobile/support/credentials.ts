export interface MobileCredentials {
  standardUser: {
    username: string;
    password: string;
  };
  lockedOutUser: {
    username: string;
    password: string;
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

export function loadMobileCredentials(): MobileCredentials {
  return {
    standardUser: {
      username: requiredEnv("SAUCEDEMO_STANDARD_USERNAME"),
      password: requiredEnv("SAUCEDEMO_STANDARD_PASSWORD"),
    },
    lockedOutUser: {
      username: requiredEnv("SAUCEDEMO_LOCKED_OUT_USERNAME"),
      password: requiredEnv("SAUCEDEMO_LOCKED_OUT_PASSWORD"),
    },
  };
}
