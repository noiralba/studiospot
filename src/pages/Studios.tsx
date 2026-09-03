import styles from '../components/Studios/StudiosCard.module.scss';
import AllStudios from '../components/Studios/AllStudios';
import { useEffect, useState } from 'react';

interface StudiosProps {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  pricePerHour: number;
  category: string;
  equipment?: string[];
}


export default function Studios() {
  
    const [studios, setStudios] = useState<StudiosProps[]>([]);
  
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
        {studios.map((studio) => (
          <AllStudios
            key={studio.id}
            studioId={studio.id}
            name={studio.name}
            description={studio.description}
            imageUrl={studio.imageUrl}
            pricePerHour={studio.pricePerHour}
            category={studio.category}
            equipment={studio.equipment}
          />
        ))}
       
      </article>
    </section>
  );
}