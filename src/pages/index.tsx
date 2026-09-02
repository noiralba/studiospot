import { useState, useEffect } from 'react';
import styles from '../components/Studios/StudiosCard.module.scss';
import StudiosCard from '../components/Studios/StudiosCard';

interface Studio {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  pricePerHour: number;
}

export default function Home() {
  const [studios, setStudios] = useState<Studio[]>([]);

  useEffect(() => {
  fetch('/api/studios')
    .then(response => response.json())
      .then(data => setStudios(data))
    .catch(error => console.error('Error fetching studios:', error))
}, []);


  return (
    <section>
      <h2>Welcome to Studio Spot</h2>
      <p>Discover and book your favorite studios with ease.</p>

      <article className={styles.studioGrid}>
        {studios.map(studio => (
          <StudiosCard
            key={studio.id}
            studioId={studio.id}
            name={studio.name}
            description={studio.description}
            pricePerHour={studio.pricePerHour}
            imageUrl={studio.imageUrl}
          />
        ))}
      </article>
    </section>
  );
}