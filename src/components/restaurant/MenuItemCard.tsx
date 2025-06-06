import React, { useState } from 'react';
import { MenuItem, Restaurant } from '../../types';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  restaurant: Restaurant;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, restaurant }) => {
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const existingItem = items.find((cartItem) => cartItem.id === item.id);
  const quantity = existingItem ? existingItem.quantity : 0;
  
  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem({ ...item, quantity: 1 }, restaurant);
      setIsAdding(false);
    }, 300);
  };
  
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
      <div className="flex-1 pr-4">
        <div className="flex items-center mb-1">
          {item.isVeg ? (
            <div className="w-4 h-4 border border-green-600 flex items-center justify-center mr-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
          ) : (
            <div className="w-4 h-4 border border-red-600 flex items-center justify-center mr-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            </div>
          )}
          {item.isRecommended && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded mr-2">
              Bestseller
            </span>
          )}
        </div>
        
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <div className="text-gray-700">₹{item.price}</div>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
      </div>
      
      <div className="w-24 h-24 relative">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover rounded-md"
          />
        )}
        
        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20">
          {quantity === 0 ? (
            <Button
              size="sm"
              variant="outline"
              className={`w-full ${isAdding ? 'animate-pulse' : ''}`}
              onClick={handleAddToCart}
            >
              ADD
            </Button>
          ) : (
            <div className="flex justify-between items-center bg-white border border-red-500 rounded">
              <button
                className="w-8 h-8 flex items-center justify-center text-red-500 font-bold"
                onClick={() => addItem({ ...item, quantity: quantity - 1 }, restaurant)}
              >
                -
              </button>
              <span className="font-medium text-sm">{quantity}</span>
              <button
                className="w-8 h-8 flex items-center justify-center text-red-500 font-bold"
                onClick={() => addItem({ ...item, quantity: 1 }, restaurant)}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;