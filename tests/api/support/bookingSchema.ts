import Ajv from "ajv";
import bookingSchema from "../schemas/booking.schema.json";
import type { Booking } from "../types/Booking";

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile<Booking>(bookingSchema);

export function validateBooking(value: unknown): {
  valid: boolean;
  errors: string[];
} {
  const valid = validate(value);

  return {
    valid,
    errors: valid
      ? []
      : (validate.errors ?? []).map(
          (error) => `${error.instancePath || "/"} ${error.message ?? "is invalid"}`,
        ),
  };
}
