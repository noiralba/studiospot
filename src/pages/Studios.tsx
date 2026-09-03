import styles from '../components/Studios/StudiosCard.module.scss';
import { useEffect, useState } from 'react';
import type { Studio } from '../components/types/Booking';
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router';


export default function Studios() {
    const navigate = useNavigate(); 
    const [studios, setStudios] = useState<Studio[]>([]);
  
    useEffect(() => {
    fetch('/api/studios')
      .then(response => response.json())
        .then(data => setStudios(data))
      .catch(error => console.error('Error fetching studios:', error))
  }, []);

  return (
    <section>
      <h2>Studios</h2>
      <p>Explore our selection of studios available for booking.</p>

      <article className={styles.studios}>
        {studios.map(studio => (
          <div key={studio.id} className={styles.studioCard}>
            <img src={studio.imageUrl} alt={`${studio.name} studio`} className={styles.image} />
            <h3 className={styles.name}>{studio.name}</h3>
            <p className={styles.description}>{studio.description}</p>
            <p className={styles.price}>Price per hour: {studio.pricePerHour} SEK</p>
            <Button type="button"
        onClick={() => navigate('/booking')}
        >Book Now</Button>
          </div>
        ))}
      </article>
    </section>
  );
}