import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { sampleOrders } from '../utils/mockData';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const OrdersPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-gray-50">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please log in to view your orders</p>
          <Link to="/login?redirect=orders">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  // If no orders
  if (sampleOrders.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-4 bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="text-gray-400 mb-4">
            <Clock size={64} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't placed any orders yet.</p>
          <Link to="/">
            <Button>Browse Restaurants</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h1>
        
        <div className="space-y-4">
          {sampleOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-lg text-gray-800">
                      {order.restaurantName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(order.timestamp).toLocaleString()}
                    </p>
                    <div className="mt-1">
                      {order.status === 'delivered' ? (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Delivered
                        </span>
                      ) : order.status === 'preparing' ? (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Preparing
                        </span>
                      ) : (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.replace('_', ' ').slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-medium">₹{order.total}</div>
                    <div className="text-sm text-gray-500">{order.items.reduce((total, item) => total + item.quantity, 0)} items</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">ITEMS</h3>
                  <ul className="space-y-1">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex justify-between text-sm">
                        <div className="flex items-center">
                          {item.isVeg ? (
                            <div className="w-3 h-3 border border-green-600 flex items-center justify-center mr-2">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                            </div>
                          ) : (
                            <div className="w-3 h-3 border border-red-600 flex items-center justify-center mr-2">
                              <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                            </div>
                          )}
                          <span>{item.name}</span>
                        </div>
                        <span className="text-gray-600">
                          {item.quantity} x ₹{item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="sm">
                    Reorder
                  </Button>
                  <Button variant="outline" size="sm">
                    <div className="flex items-center">
                      <span>View Details</span>
                      <ChevronRight size={16} />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;