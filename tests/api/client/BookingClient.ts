import type { APIRequestContext, APIResponse } from "@playwright/test";
import type { Booking, BookingResponse } from "../types/Booking";

export class BookingClient {
  private readonly createdBookingIds = new Set<number>();
  private token: string | undefined;

  constructor(private readonly request: APIRequestContext) {}

  async getBookings(): Promise<APIResponse> {
    return this.request.get("/booking");
  }

  async createBooking(
    booking: Booking,
  ): Promise<{ response: APIResponse; body: BookingResponse }> {
    const response = await this.request.post("/booking", { data: booking });
    const body = (await response.json()) as BookingResponse;

    if (response.ok() && Number.isInteger(body.bookingid)) {
      this.createdBookingIds.add(body.bookingid);
    }

    return { response, body };
  }

  async getBooking(bookingId: number): Promise<APIResponse> {
    return this.request.get(`/booking/${bookingId}`);
  }

  async authenticate(): Promise<string> {
    if (this.token) {
      return this.token;
    }

    const username = process.env.BOOKER_USERNAME;
    const password = process.env.BOOKER_PASSWORD;
    if (!username || !password) {
      throw new Error(
        "Set BOOKER_USERNAME and BOOKER_PASSWORD environment variables to use authenticated booking operations.",
      );
    }

    const response = await this.request.post("/auth", {
      data: { username, password },
    });
    if (!response.ok()) {
      throw new Error(`Booking authentication failed with status ${response.status()}.`);
    }

    const body: { token?: unknown } = await response.json();
    if (typeof body.token !== "string" || body.token.length === 0) {
      throw new Error("Booking authentication response did not contain a token.");
    }

    this.token = body.token;
    return body.token;
  }

  async updateBooking(
    bookingId: number,
    booking: Booking,
    token?: string,
  ): Promise<APIResponse> {
    return this.request.put(`/booking/${bookingId}`, {
      data: booking,
      headers: token ? { Cookie: `token=${token}` } : {},
    });
  }

  async cleanup(): Promise<void> {
    if (this.createdBookingIds.size === 0) {
      return;
    }

    const token = await this.authenticate();
    const errors: string[] = [];

    for (const bookingId of this.createdBookingIds) {
      const response = await this.request.delete(`/booking/${bookingId}`, {
        headers: { Cookie: `token=${token}` },
      });

      if (!response.ok()) {
        errors.push(`Booking ${bookingId} cleanup failed with status ${response.status()}.`);
      }
    }

    this.createdBookingIds.clear();
    if (errors.length > 0) {
      throw new Error(errors.join(" "));
    }
  }
}
