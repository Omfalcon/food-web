import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import Button from '../components/ui/Button';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const CartPage: React.FC = () => {
  const { items, restaurant, totalAmount, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isOrderPlacing, setIsOrderPlacing] = useState(false);
  
  // Handle empty cart
  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-gray-400 mb-4">
            <ShoppingBag size={64} className="mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/">
            <Button variant="primary" fullWidth>
              Explore Restaurants
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=cart');
      return;
    }
    
    setIsOrderPlacing(true);
    
    // Simulate order placement
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
      setIsOrderPlacing(false);
    }, 2000);
  };

  const deliveryFee = 40;
  const taxesAndCharges = Math.round(totalAmount * 0.05);
  const grandTotal = totalAmount + deliveryFee + taxesAndCharges;
  
  return (
    <div className="min-h-screen pt-20 bg-gray-50 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
          <p className="text-gray-600">From {restaurant?.name}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Items ({items.length})</h2>
              <div className="divide-y">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            
            {isAuthenticated && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Delivery Address</h2>
                {user?.addresses && user.addresses.length > 0 ? (
                  <div>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start">
                        <div className="bg-gray-100 text-gray-600 uppercase px-2 py-1 rounded text-xs font-medium mr-3">
                          {user.addresses[0].type}
                        </div>
                        <div>
                          <p className="text-gray-700">{user.addresses[0].address}</p>
                          {user.addresses[0].landmark && (
                            <p className="text-gray-500 text-sm">Landmark: {user.addresses[0].landmark}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => navigate('/profile/addresses')}
                    >
                      Change Address
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-3">No address found. Add a delivery address to continue.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/profile/addresses')}
                    >
                      Add New Address
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Bill Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Bill Details</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item Total</span>
                  <span>₹{totalAmount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Charges</span>
                  <span>₹{taxesAndCharges}</span>
                </div>
                
                <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                fullWidth 
                className="mt-6"
                onClick={handlePlaceOrder}
                disabled={isOrderPlacing}
              >
                {isOrderPlacing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Place Order
                    <ArrowRight size={18} className="ml-1" />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;