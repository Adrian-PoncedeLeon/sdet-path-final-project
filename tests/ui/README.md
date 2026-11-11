# UI tests

Copy the root `.env.example` to `.env` and set the SauceDemo test account
variables locally:

- `SAUCEDEMO_STANDARD_USERNAME` and `SAUCEDEMO_STANDARD_PASSWORD`
- `SAUCEDEMO_LOCKED_OUT_USERNAME` and `SAUCEDEMO_LOCKED_OUT_PASSWORD`
- `SAUCEDEMO_INVALID_USERNAME` and `SAUCEDEMO_INVALID_PASSWORD`

The UI runner loads the root `.env` automatically. The local `.env` is ignored
by Git; do not commit or share it. Environment variables already set in the
process take precedence over values in the file.
