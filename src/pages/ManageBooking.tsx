import { useState } from "react";
import "../styles/_ManageBooking.scss";
import type { Booking } from "../components/types/Booking";
import {
  validateTimeRange,
  checkDoubleBooking,
} from "../utils/bookingValidation";

export default function ManageBooking() {
  // useState för spara id, bokning, felmeddelande, ändring av bokniing
  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editDate, setEditDate] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");

  //GET
  // körs när kunden klickat på hitta bokning, rensa tidigare sök
  async function handleSearch() {
    setError("");
    setBooking(null);
    setIsEditing(false);

    try {
      const response = await fetch(`/api/bookings/${bookingId}`);

      if (!response.ok) {
        setError("Bokningen kunde tyvärr inte hittas.");
        return;
      }

      const data: Booking = await response.json();
      setBooking(data);
    } catch {
      setError("Något gick fel. Försök igen.");
    }
  }

  //PATCH avbokning
  async function handleCancel() {
    if (!booking) {
      return;
    }

    try {
      const response = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (!response.ok) {
        setError("Kunde inte avboka bokningen.");
        return;
      }

      const updatedBooking: Booking = await response.json();
      setBooking(updatedBooking);
      setIsEditing(false);
    } catch {
      setError("Något gick fel. Försök igen.");
    }
  }

  //PATCH ombokning
  async function handleUpdate() {
    if (!booking) {
      return;
    }

    setError("");
    // sätter ihop datum och tid till samma format som bokningen
    const newStartTime = `${editDate}T${editStartTime}`;
    const newEndTime = `${editDate}T${editEndTime}`;

    // kollar att sluttiden ligger efter starttiden
    const timeCheck = validateTimeRange(newStartTime, newEndTime);

    if (!timeCheck.valid) {
      setError(timeCheck.message ?? "Ogiltig tid.");
      return;
    }

    // hämtar bokningar för samma studio för att kunna kolla dubbelbokning
    try {
      const bookingsResponse = await fetch(
        `/api/bookings?studioId=${booking.studioId}`,
      );

      if (!bookingsResponse.ok) {
        setError("Kunde inte kontrollera bokningar.");
        return;
      }

      const existingBookings: Booking[] = await bookingsResponse.json();

      // kollar om nya tiden krockar, ignorerar bokningen som ändras
      const conflictCheck = checkDoubleBooking(
        newStartTime,
        newEndTime,
        booking.studioId,
        existingBookings,
        booking.id,
      );

      if (!conflictCheck.valid) {
        setError(conflictCheck.message ?? "Tiden är tyvärr redan bokad.");
        return;
      }
      // uppdaterar bokningen med de nya tiderna
      const response = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startTime: newStartTime,
          endTime: newEndTime,
        }),
      });

      if (!response.ok) {
        setError("Kunde tyvärr inte ändra bokningen.");
        return;
      }

      const updatedBooking: Booking = await response.json();

      setBooking(updatedBooking);
      setIsEditing(false);
    } catch {
      setError("Något gick fel. Försök igen.");
    }
  }

  return (
    <main className="manage-booking-page">
      <h1>Hantera din bokning</h1>

      {/* sökdel */}
      <p>Ange ditt bokningsnummer för att visa eller ändra din bokning.</p>

      <input
        type="text"
        placeholder="Bokningsnummer"
        value={bookingId}
        onChange={(event) => setBookingId(event.target.value)}
      />

      <button type="button" onClick={handleSearch}>
        Hitta bokning
      </button>

      {error && <p>{error}</p>}

      {/* visas först när en bokning har hämtats */}
      {booking && (
        <section>
          <h2>Din bokning</h2>

          <p>Studio: {booking.studioId}</p>

          {/* kör split för att dela datum och tid */}
          <p>Datum: {booking.startTime.split("T")[0]}</p>

          <p>
            Tid: {booking.startTime.split("T")[1]} -{" "}
            {booking.endTime.split("T")[1]}
          </p>

          <p>Status: {booking.status}</p>

          {isEditing && (
            <div>
              <label>
                Datum:
                <input
                  type="date"
                  value={editDate}
                  onChange={(event) => setEditDate(event.target.value)}
                />
              </label>

              <label>
                Starttid:
                <input
                  type="time"
                  value={editStartTime}
                  onChange={(event) => setEditStartTime(event.target.value)}
                />
              </label>

              <label>
                Sluttid:
                <input
                  type="time"
                  value={editEndTime}
                  onChange={(event) => setEditEndTime(event.target.value)}
                />
              </label>

              <button type="button" onClick={handleUpdate}>
                Spara ändringar
              </button>

              <button type="button" onClick={() => setIsEditing(false)}>
                Avbryt
              </button>
            </div>
          )}

          {/* om bokningen är avbokad visas text, annars knapparna */}
          {booking.status === "cancelled" ? (
            <p>Bokningen är avbokad.</p>
          ) : (
            <>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditDate(booking.startTime.split("T")[0]);
                    setEditStartTime(
                      booking.startTime.split("T")[1].slice(0, 5),
                    );
                    setEditEndTime(booking.endTime.split("T")[1].slice(0, 5));
                    setIsEditing(true);
                  }}
                >
                  Ändra bokning
                </button>
              )}

              <button type="button" onClick={handleCancel}>
                Avboka bokning
              </button>
            </>
          )}
        </section>
      )}
    </main>
  );
}
