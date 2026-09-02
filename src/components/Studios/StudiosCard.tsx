import styles from './StudiosCard.module.scss';

import Button from '../Button/Button';
import { useNavigate } from 'react-router';

interface StudioCardProps {
  name: string;
  description: string;
  imageUrl: string;
  pricePerHour: number;
  studioId?: number; // Optional studioId prop for future use 
}

//hämtar viss del av datan från db.json och visar den i en card komponent.
export default function StudiosCard({ name, description, imageUrl, pricePerHour, studioId }: StudioCardProps) {
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
        children="View Details" />
    
    </section>
  );
}