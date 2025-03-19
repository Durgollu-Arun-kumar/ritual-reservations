
export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  purpose: string;
  whenPerformed: string;
  price: number;
  duration: string;
  images: {
    main: string;
    gallery: string[];
  };
  category?: string;
  performedBy?: string;
}

export interface Priest {
  id: string;
  name: string;
  image: string;
  rating: number;
  languages: string[];
  experience: number;
  specializations: string[];
  price: number;
  availability: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BookingDetails {
  id?: string;
  serviceId: string;
  userId?: string;
  mode: "online" | "offline";
  date: Date | string;
  time: string;
  name: string;
  email: string;
  phone: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  onlineMeetingPreference?: "zoom" | "google-meet" | "other";
  languagePreference?: string;
  priestId?: string;
  specialRequirements?: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
  paymentStatus?: "pending" | "completed" | "failed" | "refunded";
  paymentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
