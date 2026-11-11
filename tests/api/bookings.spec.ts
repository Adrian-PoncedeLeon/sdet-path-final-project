import bookingData from "./data/bookings.json";
import { expect, test } from "./fixtures/apiFixtures";
import { validateBooking } from "./support/bookingSchema";
import type { Booking, BookingResponse } from "./types/Booking";

const validBooking: Booking = bookingData.validBooking;
const updatedBooking: Booking = bookingData.updatedBooking;

test("lists booking identifiers", async ({ bookingClient }) => {
  const response = await bookingClient.getBookings();
  expect(response.status()).toBe(200);

  const bookings: unknown = await response.json();
  expect(Array.isArray(bookings)).toBe(true);
  expect(
    (bookings as { bookingid?: unknown }[]).every(
      (booking) => typeof booking.bookingid === "number",
    ),
  ).toBe(true);
});

test("creates a booking that matches the booking schema", async ({ bookingClient }) => {
  const { response, body } = await bookingClient.createBooking(validBooking);
  expect(response.status()).toBe(200);
  expect(Number.isInteger(body.bookingid)).toBe(true);

  const validation = validateBooking(body.booking);
  expect(validation.valid, validation.errors.join("; ")).toBe(true);
  expect(body.booking).toEqual(validBooking);
});

test("retrieves a booking using its dynamically created identifier", async ({
  bookingClient,
}) => {
  const created = await bookingClient.createBooking(validBooking);
  expect(created.response.status()).toBe(200);

  const response = await bookingClient.getBooking(created.body.bookingid);
  expect(response.status()).toBe(200);

  const booking: Booking = await response.json();
  const validation = validateBooking(booking);
  expect(validation.valid, validation.errors.join("; ")).toBe(true);
  expect(booking).toEqual(validBooking);
});

test("updates a booking with authentication", async ({ bookingClient }) => {
  const created = await bookingClient.createBooking(validBooking);
  expect(created.response.status()).toBe(200);

  const token = await bookingClient.authenticate();
  const response = await bookingClient.updateBooking(
    created.body.bookingid,
    updatedBooking,
    token,
  );
  expect(response.status()).toBe(200);

  const booking: Booking = await response.json();
  const validation = validateBooking(booking);
  expect(validation.valid, validation.errors.join("; ")).toBe(true);
  expect(booking).toEqual(updatedBooking);
});

test("rejects a booking update without authentication", async ({ bookingClient }) => {
  const created = await bookingClient.createBooking(validBooking);
  expect(created.response.status()).toBe(200);

  const response = await bookingClient.updateBooking(
    created.body.bookingid,
    updatedBooking,
  );
  expect(response.status()).toBe(403);
});
