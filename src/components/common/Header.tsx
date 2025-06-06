import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { locations } from '../../utils/mockData';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [selectedLocation, setSelectedLocation] = useState('Koramangala');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  
  // Listen to scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const headerClass = isHomePage && !isScrolled
    ? 'bg-transparent text-white'
    : 'bg-white text-gray-800 shadow-sm';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Location */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold mr-6">
              <span className={isHomePage && !isScrolled ? "text-white" : "text-red-500"}>Zomato</span>
            </Link>
            
            <div className="relative hidden md:block">
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              >
                <MapPin size={18} className={isHomePage && !isScrolled ? "text-white" : "text-gray-500"} />
                <span className="ml-1 text-sm font-medium truncate max-w-[150px]">{selectedLocation}</span>
                
                {showLocationDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-md w-56 z-50">
                    <ul className="py-1">
                      {locations.map((loc) => (
                        <li 
                          key={loc} 
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                          onClick={() => {
                            setSelectedLocation(loc);
                            setShowLocationDropdown(false);
                          }}
                        >
                          {loc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/search" className="flex items-center">
              <Search size={18} className="mr-1" />
              <span>Search</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="flex items-center">
                  <User size={18} className="mr-1" />
                  <span>{user?.name?.split(' ')[0] || 'Profile'}</span>
                </Link>
                <Link to="/orders" className="hover:text-red-500">Orders</Link>
              </>
            ) : (
              <Link to="/login" className="hover:text-red-500">Log in</Link>
            )}
            
            <Link to="/cart" className="flex items-center">
              <div className="relative">
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="ml-1">Cart</span>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="mr-4">
              <div className="relative">
                <ShoppingBag size={20} className={isHomePage && !isScrolled ? "text-white" : "text-gray-800"} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? (
                <X size={24} className={isHomePage && !isScrolled ? "text-white" : "text-gray-800"} />
              ) : (
                <Menu size={24} className={isHomePage && !isScrolled ? "text-white" : "text-gray-800"} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white mt-4 rounded-md shadow-lg py-3 text-gray-800 absolute left-0 right-0 mx-4">
            <div className="flex items-center px-4 py-2" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
              <MapPin size={18} className="text-gray-500 mr-2" />
              <span className="text-sm font-medium">{selectedLocation}</span>
            </div>
            
            {showLocationDropdown && (
              <div className="border-t border-gray-100 mt-1">
                <ul className="py-1 max-h-60 overflow-y-auto">
                  {locations.map((loc) => (
                    <li 
                      key={loc} 
                      className="px-4 py-2 hover:bg-gray-100 text-sm"
                      onClick={() => {
                        setSelectedLocation(loc);
                        setShowLocationDropdown(false);
                      }}
                    >
                      {loc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Link to="/search" className="block px-4 py-2 hover:bg-gray-100">
              <div className="flex items-center">
                <Search size={18} className="text-gray-500 mr-2" />
                <span>Search</span>
              </div>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                  <div className="flex items-center">
                    <User size={18} className="text-gray-500 mr-2" />
                    <span>Profile</span>
                  </div>
                </Link>
                <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
              </>
            ) : (
              <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Log in</Link>
            )}
            
            <Link to="/cart" className="block px-4 py-2 hover:bg-gray-100">
              <div className="flex items-center">
                <ShoppingBag size={18} className="text-gray-500 mr-2" />
                <span>Cart</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;