import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { User, LogOut, MapPin, ShoppingBag, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-gray-50">
        <div className="max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please log in to view your profile</p>
          <Link to="/login?redirect=profile">
            <Button>Log In</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              <User size={32} className="text-gray-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-gray-600">{user?.phone}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <nav>
                <ul>
                  <li>
                    <Link to="/profile" className="block px-4 py-3 hover:bg-gray-50 text-gray-800 border-l-4 border-red-500">
                      <div className="flex items-center">
                        <User size={18} className="mr-3" />
                        <span>Profile</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile/addresses" className="block px-4 py-3 hover:bg-gray-50 text-gray-800 border-l-4 border-transparent">
                      <div className="flex items-center">
                        <MapPin size={18} className="mr-3" />
                        <span>Saved Addresses</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="block px-4 py-3 hover:bg-gray-50 text-gray-800 border-l-4 border-transparent">
                      <div className="flex items-center">
                        <ShoppingBag size={18} className="mr-3" />
                        <span>Orders</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile/payments" className="block px-4 py-3 hover:bg-gray-50 text-gray-800 border-l-4 border-transparent">
                      <div className="flex items-center">
                        <CreditCard size={18} className="mr-3" />
                        <span>Payment Methods</span>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-800 border-l-4 border-transparent"
                    >
                      <div className="flex items-center">
                        <LogOut size={18} className="mr-3" />
                        <span>Logout</span>
                      </div>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                    value={user?.name}
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input 
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                    value={user?.email}
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input 
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                    value={user?.phone || ''}
                    readOnly
                  />
                </div>
                
                <Button variant="outline" className="mt-2">
                  Edit Profile
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;