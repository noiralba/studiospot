export interface Studio {
  id: number;
  name: string;
  capacity: number;
  pricePerHour: number;
  category: "photo" | "podcast" | "music" | "video";
  imageUrl: string;
  description: string;
  equipment?: string[];
}

export interface Booking {
  id: number;
  studioId: number;
  email: string;
  startTime: string;
  endTime: string;
  status: "confirmed" | "cancelled";
}

export type NewBooking = Omit<Booking, "id">;

export type StudioCardViewProps = Pick<Studio, "name" | "description" | "imageUrl" | "pricePerHour"> & { studioId?: number };