# API tests

The API suite targets Restful Booker and uses Playwright's API request fixture.

Set these environment variables before running the suite. They are used for
authenticated updates and to clean up bookings created by each test:

- `BOOKER_USERNAME`
- `BOOKER_PASSWORD`

Run the API suite with `npm run test:api`; list discovered tests with
`npm run test:api:list`. The UI suite remains independently configured.
