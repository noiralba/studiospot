import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import styles from './AllStudios.module.scss';

interface StudiosProps {
  name: string;
  description: string;
  imageUrl: string;
  pricePerHour: number;
  category: string;
  equipment?: string[];
  studioId?: number;
}

//hämtar all data från db.json förutom equipment (lägger till det sen när vi har lagt in data där) och visar den i en card komponent.
export default function AllStudios({ name, description, imageUrl, pricePerHour, category, equipment, studioId }: StudiosProps) {
  const navigate = useNavigate(); 

  return (
    <section className={styles.allStudios}>
      <article className={styles.studioImageContainer}>
        <img src={imageUrl} alt={`${name} studio`} className={styles.image} />
      </article>
      <article className={styles.studioInfo}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>Price per hour: {pricePerHour} SEK</p>
        <p className={styles.category}>{category}</p>
        <ul className={styles.equipment}>
          <li>{equipment?.join(', ') || 'None'}</li>
        </ul>
        {/* Future implementation for studioId */}
        <Button onClick={() => navigate(studioId ? `/booking?studioId=${studioId}` : '/studios')} type="button" children="Book Now" /> 
      </article>
    </section>
  );
}