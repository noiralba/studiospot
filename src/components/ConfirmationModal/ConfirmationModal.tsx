import { useEffect, useRef } from "react";
import { Link } from "react-router";
import Button from "../Button/Button";
import styles from "./ConfirmationModal.module.scss";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails?: {
    studioId: string | null;
    date: string;
    startTime: string;
    endTime: string;
  };
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

  return (
    <dialog ref={dialogRef} className={styles.modal} onClose={onClose}>
      <div className={styles.content}>
        <h2>Bokningen bekräftad</h2>
        <p>
          Du har bokat <strong>Studio {bookingDetails.studioId}</strong>.
        </p>

        <div className={styles.details}>
          <p>
            <strong>Datum:</strong> {bookingDetails.date}
          </p>
          <p>
            <strong>Tid:</strong> {bookingDetails.startTime} -{" "}
            {bookingDetails.endTime}
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
