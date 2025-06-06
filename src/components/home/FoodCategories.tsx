import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  image: string;
}

const categories: Category[] = [
  {
    id: 'cat1',
    name: 'Pizza',
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'cat2',
    name: 'Burger',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'cat3',
    name: 'Biryani',
    image: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'cat4',
    name: 'Sushi',
    image: 'https://images.pexels.com/photos/2323398/pexels-photo-2323398.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'cat5',
    name: 'Dessert',
    image: 'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'cat6',
    name: 'Breakfast',
    image: 'https://images.pexels.com/photos/139746/pexels-photo-139746.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const FoodCategories: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Explore by Food Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8">
          {categories.map((category) => (
            <Link 
              to={`/search?category=${category.name}`} 
              key={category.id}
              className="transform transition-transform hover:scale-105"
            >
              <div className="bg-white rounded-lg overflow-hidden flex flex-col items-center text-center">
                <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden mb-3">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-800">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodCategories;