import { useEffect, useState } from "react";
import { useParams } from "react-router";
import StudioDetail from "../../components/StudioDetail/StudioDetail";

interface Studio {
  name: string;
  description: string;
  imageUrl: string;
  pricePerHour: number;
  category: string;
}

export default function StudioDetailPage() {
  const { id } = useParams();
  const [studio, setStudio] = useState<Studio | null>(null);

  useEffect(() => {
    fetch(`/api/studios/${id}`)
      .then((response) => response.json())
      .then((data) => setStudio(data));
  }, [id]);

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
      studioId={id ? Number(id) : undefined}
    />
  );
}
