import type { Booking } from "../components/types/Booking";

export interface ValidationResult {
  valid: boolean;
  message?: string;
}
/** Checking if time overlaps, if yes than newStart */
export function hasTimeConflict(
  newStart: Date,
  newEnd: Date,
  existingStart: Date, // Rättad parameter här (stod två stycken existingEnd innan)
  existingEnd: Date,
): boolean {
  return newStart < existingEnd && newEnd > existingStart;
}

/** ensure end time is after start time */
export function validateTimeRange(
  startTime: string,
  endTime: string,
): ValidationResult {
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (end <= start) {
    return {
      valid: false,
      message: "Sluttiden måste ligga efter starttiden",
    };
  }
  return { valid: true };
}

/** check for double booking */
export function checkDoubleBooking(
  newStart: string,
  newEnd: string,
  studioId: string,
  existingBooking: Booking[],
  ignoreBookingId?: string,
): ValidationResult {
  const newStartDate = new Date(newStart);
  const newEndDate = new Date(newEnd);

  const relevantBookings = existingBooking.filter(
    (booking) =>
      booking.studioId === studioId &&
      booking.status === "confirmed" &&
      booking.id !== ignoreBookingId,
  );

  for (const booking of relevantBookings) {
    const existingStart = new Date(booking.startTime);
    const existingEnd = new Date(booking.endTime);

    if (hasTimeConflict(newStartDate, newEndDate, existingStart, existingEnd)) {
      return {
        valid: false,
        message: `Studion är redan bokad mellan ${existingStart.toLocaleTimeString(
          "sv-SE",
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        )} och ${existingEnd.toLocaleTimeString("sv-SE", {
          hour: "2-digit",
          minute: "2-digit",
        })}.`,
      };
    }
  }
  return { valid: true };
}
