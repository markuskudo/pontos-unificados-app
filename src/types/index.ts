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
}

export interface Customer extends User {
  totalPoints: number;
  enrolledStores: string[];
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
}