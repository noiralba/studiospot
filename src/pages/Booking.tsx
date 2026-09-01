import type { SubmitEvent } from "react";
import { useParams } from "react-router";
import "../styles/_Booking.scss";

import FormGroup from "../components/FormGroup/FormGroup";
import Button from "../components/Button/Button";

export default function Booking() {
  const { studioId } = useParams<{ studioId: string }>();

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="booking-page">
      <h1>Boka studio</h1>
      <p>Du bokar studio med ID: {studioId}</p>

      <form onSubmit={handleSubmit}>
        <FormGroup id="date" label="Datum" type="date" required />

        <FormGroup id="startTime" label="Starttid" type="time" required />

        <FormGroup id="endTime" label="Sluttid" type="time" required />

        <FormGroup
          id="email"
          label="E-post"
          type="email"
          placeholder="din@email.com"
          required
        />

        <Button type="submit" children="Boka studio" />
      </form>
    </main>
  );
}
