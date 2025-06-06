import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, Search as SearchIcon } from 'lucide-react';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import { restaurants } from '../utils/mockData';
import { Restaurant } from '../types';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
  const [sortBy, setSortBy] = useState<string>('');
  const [showVegOnly, setShowVegOnly] = useState<boolean>(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Apply initial category filter
  useEffect(() => {
    if (initialCategory) {
      setSearchTerm(initialCategory);
    }
  }, [initialCategory]);
  
  // Filter restaurants based on search term, category, etc.
  useEffect(() => {
    let results = restaurants;
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      results = results.filter(
        restaurant => 
          restaurant.name.toLowerCase().includes(searchLower) ||
          restaurant.cuisines.some(cuisine => cuisine.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply veg only filter
    if (showVegOnly) {
      results = results.filter(restaurant => restaurant.isVeg);
    }
    
    // Apply sorting
    if (sortBy === 'rating') {
      results = [...results].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'deliveryTime') {
      results = [...results].sort((a, b) => a.deliveryTime - b.deliveryTime);
    } else if (sortBy === 'costLowToHigh') {
      results = [...results].sort((a, b) => a.priceForTwo - b.priceForTwo);
    } else if (sortBy === 'costHighToLow') {
      results = [...results].sort((a, b) => b.priceForTwo - a.priceForTwo);
    }
    
    setFilteredRestaurants(results);
  }, [searchTerm, sortBy, showVegOnly]);
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-center p-4">
            <h2 className="font-medium text-gray-800">Filters</h2>
            <button 
              className="flex items-center text-gray-600 md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-1" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          <div className={`border-t border-gray-100 p-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Sort by</label>
                <select
                  className="border border-gray-300 rounded p-2 text-sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Relevance</option>
                  <option value="rating">Rating: High to Low</option>
                  <option value="deliveryTime">Delivery Time</option>
                  <option value="costLowToHigh">Cost: Low to High</option>
                  <option value="costHighToLow">Cost: High to Low</option>
                </select>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="vegOnly"
                  checked={showVegOnly}
                  onChange={() => setShowVegOnly(!showVegOnly)}
                  className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="vegOnly" className="ml-2 text-sm text-gray-600">
                  Veg Only
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {searchTerm 
              ? `Results for "${searchTerm}" (${filteredRestaurants.length})` 
              : `All Restaurants (${filteredRestaurants.length})`}
          </h2>
          
          {filteredRestaurants.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="text-gray-400 mb-4">
                <SearchIcon size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600">
                We couldn't find any restaurants matching your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;