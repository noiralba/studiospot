import type {Booking} from "../components/types/Booking"

export interface ValidationResult {
    valid: boolean;
    message?: string;
}
/** Checking if time overlaps, if yes than newStart */
export function hasTimeConfilct (
    newStart: Date,
    newEnd: Date,
    existingStart: Date,
    existingEnd: Date,    // ← existingStart param is missing entirely
): boolean {
    return newStart <existingEnd && newEnd > existingStart;  // existingStart used but never declared
}

/** ensure end time is after start time */
export function validateTimeRange(
    startTime: string,
    endTime: string,
): ValidationResult {
    const start = new Date (startTime);
    const end = new Date (endTime);

    if (end <= start) {
        return {
            valid: false,
            message: "Slut tiden måste ligga efter start tiden",
        };
    }
    return { valid: true};
}

/** check for double booking */
export function checkDoubleBooking(
    newStart: string,
    newEnd: string,
    studioId: number,
    existingBooking: Booking[]
): ValidationResult {
    const newStartDate = new Date(newStart);
    const newEndDate = new Date(newEnd);

    const relevantBookings = existingBooking.filter(
        (booking) =>booking.studioId === studioId && booking.status === "confirmed"
    );
    for (const booking of relevantBookings) {
        const existingStart = new Date (booking.startTime);
        const existingEnd = new Date (booking.endTime);

        if (hasTimeConfilct(newStartDate, newEndDate, existingStart, existingEnd)){
            return {
                valid: false,
                message: `Studio är redan bokad §{existingStart.toLocalTimeString("sv-SE",
                {hour: "2-digit", minute: "2-digit"})}
                och §{existingEnd.toLocalTimeString("sv-SE",
                {hour: "2-digit", minute: "2-digit"})}.`,
            };
        }
    }
    return {valid: true};
}
