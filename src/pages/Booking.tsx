import { Form, useSearchParams, redirect, useActionData } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import "../styles/_Booking.scss";

import FormGroup from "../components/FormGroup/FormGroup";
import Button from "../components/Button/Button";
import type {Booking} from "../components/types/Booking";
import {validateTimeRange, checkDoubleBooking} from "../utils/bookingValidation";

interface ActionData {
  error?: string;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const url = new URL(request.url);
  //console.log("action received URL:", request.url);
  const studioIdParam = url.searchParams.get("studioId");
  const studioId = studioIdParam ? Number(studioIdParam) : undefined;
  if (!studioId) {
    return {error: "ogiltigt studio-id"};
  }
  
  const date = formData.get("date") as  string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const email = formData.get("email") as string;

  const startISO = `${date}T${startTime}`;
  const endISO = `${date}T${endTime}`;

  const bookingData = {
    studioId,
    date: formData.get("date") as string,
    startTime: formData.get("startTime") as string,
    endTime: formData.get("endTime") as string,
    email,
  };

  // middleware
  const timeCheck = validateTimeRange(startISO, endISO);
  if(!timeCheck.valid) {
    return {error: timeCheck.message ?? "Ogitig tid"};
  }
  let existingBookings: Booking[];
  try{
    const bookingsRes = await fetch (`/api/bookings?studioId=${studioId}`);
    if (!bookingsRes.ok) {
      return {error: "Kan inte hämta befintlig bokningar"};
    }
    existingBookings = await bookingsRes.json();
  } catch {
    return {error: "Fel. Försök igen"};
  }
  const conflictCheck = checkDoubleBooking(startISO, endISO, studioId, existingBookings);
  if(!conflictCheck.valid) {
    return {error: conflictCheck.message ?? "Studio är inte tillgänglig"};
  }

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      return { error: "Kunde inte spara bokningen på servern." };
    }

    return redirect("/");
  } catch {
    return { error: "Nätverksfel. Försök igen senare." };
  }
}

export default function Booking() {
  const [searchParams] = useSearchParams();
  const studioId = searchParams.get("studioId");
  const actionData = useActionData() as ActionData | undefined;

  return (
    <main className="booking-page">
      <h1>Boka studio</h1>
      <p>Du bokar studio med ID: {studioId}</p>

      {actionData?.error && <p className="error-message">{actionData.error}</p>}

      <Form method="post" action={`?${searchParams.toString()}`}>
        <FormGroup id="date" name="date" label="Datum" type="date" autoComplete="off" required />

        <FormGroup
          id="startTime"
          name="startTime"
          label="Starttid"
          type="time"
          autoComplete="off"
          required
        />

        <FormGroup
          id="endTime"
          name="endTime"
          label="Sluttid"
          type="time"
          autoComplete="off"
          required
        />

        <FormGroup
          id="email"
          name="email"
          label="E-post"
          type="email"
          placeholder="din@email.com"
          autoComplete="email"
          required
        />

        <Button type="submit">Boka studio</Button>
      </Form>
    </main>
  );
}
