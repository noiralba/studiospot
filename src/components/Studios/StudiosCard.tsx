import styles from './StudiosCard.module.scss';

import Button from '../Button/Button';
// import { Link } from 'react-router';

interface StudioCardProps {
  name: string;
  description: string;
  imageUrl: string;
  pricePerHour: number;

}

export default function StudiosCard({ name, description, imageUrl, pricePerHour }: StudioCardProps) {
  return (
    <section className={styles.studioCard}>
      <img src={imageUrl} alt={`${name} studio`} className={styles.image} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <p className={styles.price}>Price per hour: {pricePerHour} SEK</p>
      {/* <Link to={`studios/${studioId}`}> */}
      <Button type="button" children="Läs mer" />
    {/* </Link> */}
    </section>
  );
}