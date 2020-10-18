export type Toilet = {
  name: string;
  timestamp?: string;
  who?: string; // Who is filling out this form?"
  correspondence_name?: string;
  type: string; // Type of building
  type_further_details?: string;
  category: string; // What venue category does this fall into?
  address?: string; // Address Line 1
  town?: string; // Town / City
  county?: string; // County
  region?: string; // Region
  country?: string; // Country
  post_code?: string; // Post code
  contact_details?: string; // Contact details of venue to appear on map (Telephone/Email/website)
  equipment_checklist: string[];
  other_helpful_information: string[];
  managed_setting?: boolean;
  washbasin?: string; // Washbasin
  opening_hours_mon_fri?: string; // Opening hours Mon - Fri
  opening_hours_sat_sun?: string; // Opening hours Sat - Sun
  opening_hours_public_holidays?: string; // Opening hours public holidays
  other_comments?: string; // Other comments
  comments_from_consortium?: string; // Comments from consortium
  signage?: boolean; // Signage
  photo?: boolean; // Photo received?
  location?: string; // Location
  latLng: { lat: number; lng: number };
  distance?: number;
};

export type FilterableKey = "type" | "category";
