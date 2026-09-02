import { useNavigate } from 'react-router';
import Button from '../Button/Button';
import styles from './StudioDetail.module.scss';

export interface StudioDetailProps {
  name: string;
  description: string;
  imageUrl: string;
  pricePerHour: number;
  category: string;
  studioId?: number; // Optional studioId prop for future use
}

export default function StudioDetail({ name, description, imageUrl, pricePerHour, category, studioId }: StudioDetailProps) {

const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <section className={styles.studioDetail}>
      <article className={styles.studioImageContainer}>
        <img src={imageUrl} alt={`${name} studio`} className={styles.image} />
      </article>
      <article className={styles.studioInfo}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.price}>Price per hour: {pricePerHour} SEK</p>
        <p className={styles.category}>Category: {category}</p>
      </article>
      <article className={styles.studioActions}>
        <Button
          onClick={() => navigate(studioId ? `/booking/${studioId}` : '/booking')} // Navigate to booking page with studioId if available
          type='button'
          children='Book Now' />
      </article>
    </section>
  );
}