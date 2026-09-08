import { useEffect, useState } from 'react';
import type { Studio } from '../components/types/Booking';
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router';

import "../styles/_Studios.scss";


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

      <article className="studiosContainer">
        {studios.map(studio => (
          <div key={studio.id} className="studioCard">
            <div className="imageContainer">
              <img src={studio.imageUrl} alt={`${studio.name} studio`} className="image" />
            </div>
            <div className="studioInfo">
            <h3 className="name">{studio.name}</h3>
            <p className="description">{studio.description}</p>
            <p className="price">Price per hour: {studio.pricePerHour} SEK</p>
            <p className="capacity">Capacity: {studio.capacity} people</p>
            <p className="category">{studio.category}</p>
            <Button type="button"
       onClick={() => navigate(`/booking?studioId=${studio.id}`)}
              >Book Now</Button>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
}