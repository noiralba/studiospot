import { useEffect, useRef } from "react";
import { Link } from "react-router";
import Button from "../Button/Button";
import styles from "./ConfirmationModal.module.scss";
import type { Booking } from "../types/Booking";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails?: Booking;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  bookingDetails,
}: ConfirmationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  if (!bookingDetails) return null;

  const [date, startTime] = bookingDetails.startTime.split("T");
  const [, endTime] = bookingDetails.endTime.split("T");

  return (
    <dialog ref={dialogRef} className={styles.modal} onClose={onClose}>
      <div className={styles.content}>
        <h2>Bokningen bekräftad</h2>
        <p>
          Bokningsnummer: <strong>{bookingDetails.id}</strong>
        </p>
        <p>
          Du har bokat <strong>Studio {bookingDetails.studioId}</strong>.
        </p>

        <div className={styles.details}>
          <p>
            <strong>Datum:</strong> {date}
          </p>
          <p>
            <strong>Tid:</strong> {startTime} - {endTime}
          </p>
          <p>
            <strong>Bekräftelse skickad till:</strong> {bookingDetails.email}
          </p>
        </div>

        <div className={styles.actions}>
          <Link to="/managebooking" className={styles.secondaryLink}>
            Visa mina bokningar
          </Link>
          <Button type="button" onClick={onClose}>
            Klar, till startsidan
          </Button>
        </div>
      </div>
    </dialog>
  );
}
