export interface Studio {
  id: string;
  name: string;
  capacity: number;
  pricePerHour: number;
  category: "photo" | "podcast" | "music" | "video";
  imageUrl: string;
  description: string;
  equipment?: string[];
}

export interface Booking {
  id: string;
  studioId: string;
  email: string;
  startTime: string;
  endTime: string;
  status: "confirmed" | "cancelled";
}

export type NewBooking = Omit<Booking, "id">;

export type StudioCardViewProps = Pick<Studio, "name" | "description" | "imageUrl" | "pricePerHour"> & { studioId?: string };