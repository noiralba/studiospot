import { useEffect, useState } from "react";
import type { Studio } from "../components/types/Booking";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router";
import { get } from "../api/api";
import "../styles/_Studios.scss";

export default function Studios() {
  const navigate = useNavigate();
  const [studios, setStudios] = useState<Studio[]>([]);

  useEffect(() => {
    get<Studio[]>("/api/studios")
      .then((data) => setStudios(data))
      .catch((error) => console.error("Error fetching studios:", error));
  }, []);

  return (
    <section>
      <article className="studiosContainer">
        {studios.map((studio) => (
          <div key={studio.id} className="studioCard">
            <div className="imageContainer">
              <img
                src={studio.imageUrl}
                alt={`${studio.name} studio`}
                className="image"
              />
            </div>
            <div className="studioInfo">
              <h3 className="name">{studio.name}</h3>
              <p className="description">{studio.description}</p>
              <p className="price">{studio.pricePerHour} kr/h</p>
              <p className="capacity">Antal pers: {studio.capacity} st</p>
              <p className="category">{studio.category}</p>
              <Button
                type="button"
                onClick={() => navigate(`/booking?studioId=${studio.id}`)}
              >
                Boka nu
              </Button>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
}
