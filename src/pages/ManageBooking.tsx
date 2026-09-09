import { useState } from "react";
import "../styles/_ManageBooking.scss";
import { get, patch } from "../api/api";
import type { Booking } from "../components/types/Booking";

import {
  validateTimeRange,
  checkDoubleBooking,
} from "../utils/bookingValidation";

export default function ManageBooking() {
  // useState för e-postsökning, bokningar, vald bokning, felmeddelande och redigering
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editDate, setEditDate] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");

  function updateBookingState(updatedBooking: Booking) {
    setBooking(updatedBooking);

    setBookings((previousBookings) =>
      previousBookings.map((item) =>
        item.id === updatedBooking.id ? updatedBooking : item,
      ),
    );
  }

  //GET
  // körs när kunden klickar på Visa bokningar och rensar tidigare sökresultat
  async function handleSearch() {
    setError("");
    setBookings([]);
    setBooking(null);
    setIsEditing(false);

    if (!email.trim()) {
      setError("Ange din e-postadress.");
      return;
    }

    try {
      const data = await get<Booking[]>(
        `/api/bookings?email=${encodeURIComponent(email.trim())}`,
      );
      if (data.length === 0) {
        setError("Inga bokningar hittades för den angivna e-postadressen.");
        return;
      }

      setBookings(data);
    } catch {
      setError("Bokningarna kunde tyvärr inte hämtas.");
    }
  }

  //PATCH avbokning
  async function handleCancel() {
    if (!booking) {
      return;
    }

    try {
      const updatedBooking = await patch<Partial<Booking>, Booking>(
        `/api/bookings/${booking.id}`,
        { status: "cancelled" },
      );
      updateBookingState(updatedBooking);
      setIsEditing(false);
    } catch {
      setError("Kunde inte avboka bokningen.");
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
      const existingBookings = await get<Booking[]>("/api/bookings");

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

      const updatedBooking = await patch<Partial<Booking>, Booking>(
        `/api/bookings/${booking.id}`,
        {
          startTime: newStartTime,
          endTime: newEndTime,
        },
      );

      updateBookingState(updatedBooking);
      setIsEditing(false);
    } catch {
      setError("Kunde inte kontrollera bokningar.");
    }
  }

  return (
    <main className="manage-booking-page">
      <h1>Hantera din bokning</h1>

      {/* sökdel */}
      <p>Ange din e-postadress för att visa eller ändra dina bokningar.</p>

      <input
        type="email"
        placeholder="E-postadress"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <button type="button" onClick={handleSearch}>
        Visa bokningar
      </button>

      {error && <p>{error}</p>}

      {bookings.length > 0 && (
        <section>
          <h2>Dina bokningar</h2>

          {bookings.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setBooking(item);
                setIsEditing(false);
              }}
            >
              Bokningsdetaljer - {item.startTime.split("T")[0]}
            </button>
          ))}
        </section>
      )}

      {/* visas först när en bokning har hämtats */}
      {booking && (
        <section className="booking-details">
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

          {booking.status === "cancelled" ? (
            <p>Bokningen är avbokad.</p>
          ) : (
            <>
              {!isEditing && (
                <>
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

                  <button type="button" onClick={handleCancel}>
                    Avboka bokning
                  </button>
                </>
              )}
            </>
          )}

          <button
            type="button"
            onClick={() => {
              setBooking(null);
              setIsEditing(false);
            }}
          >
            Tillbaka till mina bokningar
          </button>
        </section>
      )}
    </main>
  );
}
