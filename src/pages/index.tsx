import { useState, useEffect } from "react";
import styles from "../components/Studios/StudiosCard.module.scss";
import StudiosCard from "../components/Studios/StudiosCard";
import { get } from "../api/api";
import Hero from "../components/Hero/Hero";
import type { Studio } from "../components/types/Booking";

export default function Home() {
  const [studios, setStudios] = useState<Studio[]>([]);

  useEffect(() => {
    get<Studio[]>("/api/studios")
      .then((data) => setStudios(data))
      .catch((error) => console.error("Error fetching studios:", error));
  }, []);

  return (
    <section>
      <Hero />
      <article className={styles.studioGrid}>
        {studios.map((studio) => (
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
