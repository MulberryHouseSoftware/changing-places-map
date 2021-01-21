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
  place_id: string;
  formatted_address: string;
  distance?: number;
};

export type FilterableKey = "category";
