# API tests

The API suite targets Restful Booker and uses Playwright's API request fixture.

Copy the root `.env.example` to `.env` and set `BOOKER_USERNAME` and
`BOOKER_PASSWORD` locally. These are used for authenticated updates and to
clean up bookings created by each test. The root `.env` is ignored by Git; do
not commit or share it.

The API runner loads the root `.env` automatically. Environment variables
already set in the process take precedence over values in the file.

Run the API suite with `npm run test:api`; list discovered tests with
`npm run test:api:list`. The UI suite remains independently configured.
