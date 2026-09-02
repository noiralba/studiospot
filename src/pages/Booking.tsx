import { Form, useParams, redirect, useActionData } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import "../styles/_Booking.scss";

import FormGroup from "../components/FormGroup/FormGroup";
import Button from "../components/Button/Button";

interface ActionData {
  error?: string;
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();

  const bookingData = {
    studioId: params.studioId,
    date: formData.get("date") as string,
    startTime: formData.get("startTime") as string,
    endTime: formData.get("endTime") as string,
    email: formData.get("email") as string,
  };

  // middleware

  try {
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      return { error: "Kunde inte spara bokningen på servern." };
    }

    return redirect("/booking-success");
  } catch (error) {
    return { error: "Nätverksfel. Försök igen senare." };
  }
}

export default function Booking() {
  const { studioId } = useParams<{ studioId: string }>();
  const actionData = useActionData() as ActionData | undefined;

  return (
    <main className="booking-page">
      <h1>Boka studio</h1>
      <p>Du bokar studio med ID: {studioId}</p>

      {actionData?.error && <p className="error-message">{actionData.error}</p>}

      <Form method="post">
        <FormGroup id="date" name="date" label="Datum" type="date" required />

        <FormGroup
          id="startTime"
          name="startTime"
          label="Starttid"
          type="time"
          required
        />

        <FormGroup
          id="endTime"
          name="endTime"
          label="Sluttid"
          type="time"
          required
        />

        <FormGroup
          id="email"
          name="email"
          label="E-post"
          type="email"
          placeholder="din@email.com"
          required
        />

        <Button type="submit">Boka studio</Button>
      </Form>
    </main>
  );
}
