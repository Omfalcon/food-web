import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import FoodCategories from '../components/home/FoodCategories';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import { restaurants } from '../utils/mockData';

const HomePage: React.FC = () => {
  // Filter restaurants for different sections
  const promotedRestaurants = restaurants.filter(r => r.promoted);
  const topRatedRestaurants = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 6);
  
  return (
    <div className="min-h-screen">
      <HeroBanner />
      
      <FoodCategories />
      
      {/* Promoted Restaurants Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Featured Restaurants
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotedRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Top Rated Restaurants Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Top Rated Near You
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRatedRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
      
      {/* App Download Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Get the Zomato App
              </h2>
              <p className="text-gray-600 mb-6 max-w-md">
                We'll send you a link, open it on your phone to download the app
              </p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div>
                  <input 
                    type="radio" 
                    id="email" 
                    name="app-link" 
                    className="w-4 h-4 text-red-500 focus:ring-red-400" 
                    defaultChecked
                  />
                  <label htmlFor="email" className="ml-2 text-gray-700">Email</label>
                </div>
                <div>
                  <input 
                    type="radio" 
                    id="phone" 
                    name="app-link"
                    className="w-4 h-4 text-red-500 focus:ring-red-400"
                  />
                  <label htmlFor="phone" className="ml-2 text-gray-700">Phone</label>
                </div>
              </div>
              
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Email" 
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
                <button className="bg-red-500 text-white px-6 py-2 rounded-r-lg hover:bg-red-600 transition-colors">
                  Share App Link
                </button>
              </div>
            </div>
            
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img 
                src="https://images.pexels.com/photos/6205791/pexels-photo-6205791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Mobile App" 
                className="w-full max-w-xs rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;