type BookingStatus = "confirmed" | "cancelled"; //type med union - status (kan bara vara confirmed eller cancelled)

//interface - bokningsobjektet
interface Booking {
  id: number;
  studioId: number;
  email: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
}

export default function ManageBooking() {
  // testdata för att kunna bygga innan riktig data hämtas!
  const testBooking: Booking = {
    id: 1,
    studioId: 1,
    email: "test@example.com",
    startTime: "2026-09-02T10:00:00",
    endTime: "2026-09-02T12:00:00",
    status: "confirmed",
  };
  return (
    <main>
      <h1>Hantera din bokning</h1>
      {/* sökdelens skelett */}
      <p>Ange ditt bokningsnummer för att visa eller ändra din bokning.</p>
      <input type="text" placeholder="Bokningsnummer" />
      <button type="button">Hitta bokning</button>
      {/* visar bokningsinfo från testBooking */}
      <section>
        <h2>Din bokning</h2>
        <p>Studio: {testBooking.studioId}</p>
        {/* här kör jag en split, måste jobba vidare på att inte rendera sekunder på time*/}
        <p>Datum: {testBooking.startTime.split("T")[0]}</p>
        <p>
          Tid: {testBooking.startTime.split("T")[1]} -{" "}
          {testBooking.endTime.split("T")[1]}
        </p>
        <p>Status: {testBooking.status}</p>
        <button type="button">Ändra bokning</button>
        {/* om bokningen är avbokad, visas text, annars avbokningsknappen, testat
        med npm run build */}
        {testBooking.status === "cancelled" ? (
          <p>Bokningen är avbokad.</p>
        ) : (
          <button type="button">Avboka bokning</button>
        )}
      </section>
    </main>
  );
}
