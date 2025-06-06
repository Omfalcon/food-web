// Type definitions

export interface Restaurant {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  deliveryTime: number; // in minutes
  priceForTwo: number;
  imageUrl: string;
  discount?: string;
  promoted?: boolean;
  isVeg?: boolean;
  location: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVeg: boolean;
  isRecommended?: boolean;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  address: string;
  landmark?: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered';
  total: number;
  deliveryAddress: Address;
  timestamp: Date;
  deliveryTime: number; // in minutes
}