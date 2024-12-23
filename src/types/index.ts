export type UserRole = "admin" | "merchant" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface Merchant extends User {
  storeName: string;
  city: string;
  points: number;
  active: boolean;
  cnpj?: string;
  street?: string;
  state?: string;
  zipCode?: string;
  whatsapp?: string;
}

export interface Customer extends User {
  totalPoints: number;
  enrolledStores: string[];
  pointsPerStore: {
    storeId: string;
    storeName: string;
    points: number;
  }[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  pointsPrice: number;
  image: string;
  active: boolean;
}

export interface Offer {
  id: string;
  merchantId: string;
  title: string;
  description: string;
  pointsRequired: number;
  validUntil: Date;
  active: boolean;
  image?: string;
}