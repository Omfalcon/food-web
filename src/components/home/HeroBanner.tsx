import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative h-[500px] md:h-[550px] bg-cover bg-center flex items-center justify-center"
         style={{ 
           backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'
         }}>
      <div className="text-center px-4 z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeIn">
          Discover the best food & drinks
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          From local favorites to exciting new restaurants, we've got you covered
        </p>
        
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            className="w-full px-5 py-4 pr-12 rounded-lg text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <Link to="/search" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Search size={20} />
          </Link>
        </div>
      </div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;