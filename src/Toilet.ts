export type Toilet = {
  id: string;
  name: string;
  address_1: string;
  address_2: string;
  city: string;
  postcode: string;
  county: string;
  state: string;
  country: string;
  lat: string;
  lng: string;
  category: string;
  tel: string;
  email: string;
  url: string;
  features: string[];
  opening_hours?: string;
  place_id: string;
  formatted_address: string;
  distance?: number;
  equipment_standard?: "Green" | "Orange" | "Yellow" | undefined;
};

export type FilterableKey = "category";
