export interface Venue {
  id: string;
  name: string;
  type: number;
  image: string;
  description: string;
  street: string;
  postcode: string;
  city: string;
  country: string;
  capacity: number;
  price: { from: number; to: number };
  rating: number;
  traits: string[];
  parking: number[];
  publicTransitMinutes: number;
  seatingTypes: number[];
  indoor: boolean;
  amenities: number[];
}
