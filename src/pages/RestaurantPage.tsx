import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, Bookmark, Share, ChevronDown } from 'lucide-react';
import { restaurants, menuItems } from '../utils/mockData';
import { Restaurant as RestaurantType, MenuItem } from '../types';
import MenuItemCard from '../components/restaurant/MenuItemCard';

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    if (id) {
      const foundRestaurant = restaurants.find((r) => r.id === id);
      if (foundRestaurant) {
        setRestaurant(foundRestaurant);
        
        // Get menu items
        const restaurantMenu = menuItems[id] || [];
        setMenu(restaurantMenu);
        
        // Extract categories
        const uniqueCategories = [...new Set(restaurantMenu.map(item => item.category))];
        setCategories(uniqueCategories);
        
        if (uniqueCategories.length > 0) {
          setActiveCategory(uniqueCategories[0]);
        }
      }
    }
  }, [id]);
  
  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading restaurant details...</div>
      </div>
    );
  }

  // Group menu items by category
  const menuByCategory: Record<string, MenuItem[]> = {};
  menu.forEach((item) => {
    if (!menuByCategory[item.category]) {
      menuByCategory[item.category] = [];
    }
    menuByCategory[item.category].push(item);
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          {/* Restaurant Image and Info */}
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 mb-4 md:mb-0">
              <img
                src={restaurant.imageUrl}
                alt={restaurant.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div className="md:w-3/5 md:pl-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{restaurant.name}</h1>
              
              <p className="text-gray-600 mb-3">{restaurant.cuisines.join(', ')}</p>
              <p className="text-gray-600 mb-4">{restaurant.location}</p>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center bg-green-50 px-3 py-2 rounded-md">
                  <div className="flex items-center bg-green-700 text-white px-1.5 py-0.5 rounded text-sm">
                    <Star size={14} className="mr-0.5" />
                    <span>{restaurant.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600 ml-2">1000+ ratings</span>
                </div>
                
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-md">
                  <Clock size={18} className="text-gray-600" />
                  <span className="text-sm text-gray-600 ml-2">{restaurant.deliveryTime} min</span>
                </div>
                
                <div className="flex items-center bg-gray-50 px-3 py-2 rounded-md">
                  <span className="text-sm text-gray-600">₹{restaurant.priceForTwo} for two</span>
                </div>
              </div>
              
              {restaurant.discount && (
                <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-r-md">
                  <p className="text-red-600 text-sm font-medium">{restaurant.discount}</p>
                </div>
              )}
              
              <div className="flex space-x-4">
                <button className="flex items-center text-gray-700 hover:text-red-500">
                  <Bookmark size={18} className="mr-1" />
                  <span>Save</span>
                </button>
                <button className="flex items-center text-gray-700 hover:text-red-500">
                  <Share size={18} className="mr-1" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Category Navigation */}
          {categories.length > 0 && (
            <div className="border-b sticky top-16 bg-white z-10">
              <div className="flex overflow-x-auto py-4 px-4 gap-x-8 no-scrollbar">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`whitespace-nowrap font-medium pb-2 px-1 border-b-2 ${
                      activeCategory === category
                        ? 'text-red-500 border-red-500'
                        : 'text-gray-600 border-transparent hover:text-red-500'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Menu Items */}
          <div className="p-4">
            {categories.map((category) => (
              <div key={category} id={category} className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  {category}
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({menuByCategory[category]?.length || 0} items)
                  </span>
                </h2>
                
                <div className="space-y-2">
                  {menuByCategory[category]?.map((item) => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      restaurant={restaurant}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;