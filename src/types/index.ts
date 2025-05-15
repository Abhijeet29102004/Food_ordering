export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  featured: boolean;
  discount?: number;
  prepTime: number;
  rating: number;
  reviews: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  total: number;
  createdAt: string;
  estimatedDelivery: string;
}

export type PaymentMethod = 'credit-card' | 'cash-on-delivery' | 'wallet';