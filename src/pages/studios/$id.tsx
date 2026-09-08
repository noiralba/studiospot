import { useEffect, useState } from "react";
import { useParams } from "react-router";
import StudioDetail from "../../components/StudioDetail/StudioDetail";
import { get } from "../../api/api";
import type { Studio } from "../../components/types/Booking";

export default function StudioDetailPage() {
  const { id } = useParams();
  const [studio, setStudio] = useState<Studio | null>(null);

  useEffect(() => {
    get<Studio>(`/api/studios/${id}`).then((data) => setStudio(data));
  }, [id]);

  if (!id) {
    return <p>Ogiltigt studio-id</p>;
  }

  if (!studio) {
    return <p>Loading...</p>;
  }
  return (
    <StudioDetail
      name={studio.name}
      description={studio.description}
      imageUrl={studio.imageUrl}
      pricePerHour={studio.pricePerHour}
      category={studio.category}
      studioId={Number(id)}
    />
  );
}
