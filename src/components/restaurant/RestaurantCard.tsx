import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const {
    id,
    name,
    cuisines,
    rating,
    deliveryTime,
    priceForTwo,
    imageUrl,
    discount,
    promoted
  } = restaurant;

  return (
    <Link to={`/restaurant/${id}`} className="block">
      <Card hoverable className="h-full transition-all duration-300">
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-48 object-cover"
          />
          {discount && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="primary" size="md">{discount}</Badge>
            </div>
          )}
          {promoted && (
            <div className="absolute top-2 left-2 bg-gray-800 bg-opacity-80 text-white text-xs px-2 py-1 rounded">
              Promoted
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-bold text-gray-800 text-lg truncate flex-1">{name}</h3>
            <div className="flex items-center bg-green-700 text-white px-1.5 py-0.5 rounded text-sm ml-2">
              <Star size={14} className="mr-0.5" />
              <span>{rating}</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mb-2 truncate">{cuisines.join(', ')}</p>
          
          <div className="flex justify-between text-sm text-gray-600 mt-auto">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              <span>{deliveryTime} min</span>
            </div>
            <div>₹{priceForTwo} for two</div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default RestaurantCard;