import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Restaurant } from '../types';

interface CartContextType {
  items: CartItem[];
  restaurant: Restaurant | null;
  addItem: (item: CartItem, restaurant: Restaurant) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalAmount: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem('zomato_cart_items');
    const storedRestaurant = localStorage.getItem('zomato_cart_restaurant');
    
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
    
    if (storedRestaurant) {
      setRestaurant(JSON.parse(storedRestaurant));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('zomato_cart_items', JSON.stringify(items));
    if (restaurant) {
      localStorage.setItem('zomato_cart_restaurant', JSON.stringify(restaurant));
    }
  }, [items, restaurant]);

  const addItem = (item: CartItem, newRestaurant: Restaurant) => {
    // Check if adding from a different restaurant
    if (restaurant && restaurant.id !== newRestaurant.id) {
      if (window.confirm('Adding items from a different restaurant will clear your current cart. Continue?')) {
        setItems([item]);
        setRestaurant(newRestaurant);
        return;
      } else {
        return;
      }
    }

    // If it's the first item, set the restaurant
    if (!restaurant) {
      setRestaurant(newRestaurant);
    }

    // Check if item already exists
    const existingItemIndex = items.findIndex((i) => i.id === item.id);
    
    if (existingItemIndex > -1) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += item.quantity;
      setItems(updatedItems);
    } else {
      setItems([...items, item]);
    }
  };

  const removeItem = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId));
    
    // If removing the last item, clear the restaurant too
    if (items.length === 1 && items[0].id === itemId) {
      setRestaurant(null);
      localStorage.removeItem('zomato_cart_restaurant');
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(
      items.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setRestaurant(null);
    localStorage.removeItem('zomato_cart_items');
    localStorage.removeItem('zomato_cart_restaurant');
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        restaurant,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalAmount,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};