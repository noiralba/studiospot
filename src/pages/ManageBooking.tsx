import { useState } from "react";

type BookingStatus = "confirmed" | "cancelled";

// interface - bokningsobjektet
interface Booking {
  id: number;
  studioId: number;
  email: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
}

export default function ManageBooking() {
  // useState för spara id, bokning, felmeddelande
  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");

  //GET
  // körs när kunden klickat på hitta bokning, rensa tidigare sök
  async function handleSearch() {
    setError("");
    setBooking(null);

    try {
      const response = await fetch(`/api/booking/${bookingId}`);

      if (!response.ok) {
        setError("Bokningen kunde inte hittas.");
        return;
      }

      const data: Booking = await response.json();
      setBooking(data);
    } catch {
      setError("Något gick fel. Försök igen.");
    }
  }

  //PATCH
  async function handleCancel() {
    if (!booking) {
      return;
    }

    try {
      const response = await fetch(`/api/booking/${booking.id}`, {
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
    } catch {
      setError("Något gick fel. Försök igen.");
    }
  }

  return (
    <main>
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

          <button type="button">Ändra bokning</button>

          {/* om bokningen är avbokad visas text, annars avbokningsknappen */}
          {booking.status === "cancelled" ? (
            <p>Bokningen är avbokad.</p>
          ) : (
            <button type="button" onClick={handleCancel}>
              Avboka bokning
            </button>
          )}
        </section>
      )}
    </main>
  );
}
