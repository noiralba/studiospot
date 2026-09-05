import styles from './StudiosCard.module.scss';

import Button from '../Button/Button';
import { useNavigate } from 'react-router';

import type { StudioCardViewProps } from '../types/Booking';


//använder type StudioCardViewProps för att definiera props som komponenten tar emot, inklusive studioId som nu är required
export default function StudiosCard({ name, description, imageUrl, pricePerHour, studioId }: StudioCardViewProps) {
  const navigate = useNavigate(); // Initialize useNavigate hook
  
  return (
    <section className={styles.studioCard}>
      <img src={imageUrl} alt={`${name} studio`} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>Price per hour: {pricePerHour} SEK</p>
      <Button
        onClick={() => navigate(studioId ? `/studios/${studioId}` : '/studios')}
        type="button"
        >View Details</Button>
    
    </section>
  );
}