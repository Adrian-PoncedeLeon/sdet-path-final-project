import { test as base, expect } from "@playwright/test";
import { BookingClient } from "../client/BookingClient";

interface ApiFixtures {
  bookingClient: BookingClient;
}

export const test = base.extend<ApiFixtures>({
  bookingClient: async ({ request }, use) => {
    const bookingClient = new BookingClient(request);

    try {
      await use(bookingClient);
    } finally {
      await bookingClient.cleanup();
    }
  },
});

export { expect };
