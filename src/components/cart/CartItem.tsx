import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
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
          <h3 className="font-medium text-gray-800">{item.name}</h3>
        </div>
        
        <div className="text-gray-600 text-sm mb-2">
          ₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}
        </div>
        
        <div className="flex items-center">
          <div className="flex border border-gray-300 rounded">
            <button 
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <div className="w-8 h-8 flex items-center justify-center text-gray-800 font-medium">
              {item.quantity}
            </div>
            <button 
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
          
          <button 
            className="ml-4 text-red-500 hover:text-red-700"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;