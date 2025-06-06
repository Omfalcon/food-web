import { Restaurant, MenuItem, Order } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger King',
    cuisines: ['Burger', 'American', 'Fast Food'],
    rating: 4.2,
    deliveryTime: 25,
    priceForTwo: 350,
    imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    discount: '50% OFF up to ₹100',
    promoted: true,
    location: 'Koramangala'
  },
  {
    id: '2',
    name: 'Paradise Biryani',
    cuisines: ['Biryani', 'Indian', 'Mughlai'],
    rating: 4.5,
    deliveryTime: 35,
    priceForTwo: 500,
    imageUrl: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    discount: '₹125 OFF above ₹249',
    location: 'Indiranagar'
  },
  {
    id: '3',
    name: 'Pizza Hut',
    cuisines: ['Pizza', 'Italian', 'Fast Food'],
    rating: 3.9,
    deliveryTime: 30,
    priceForTwo: 600,
    imageUrl: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    location: 'Electronic City'
  },
  {
    id: '4',
    name: 'Truffles',
    cuisines: ['American', 'Continental', 'Desserts'],
    rating: 4.7,
    deliveryTime: 40,
    priceForTwo: 800,
    imageUrl: 'https://images.pexels.com/photos/6941010/pexels-photo-6941010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    promoted: true,
    location: 'Koramangala'
  },
  {
    id: '5',
    name: 'Fresh Salad Co.',
    cuisines: ['Healthy Food', 'Salad', 'Continental'],
    rating: 4.3,
    deliveryTime: 22,
    priceForTwo: 450,
    imageUrl: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    discount: '30% OFF on first 3 orders',
    isVeg: true,
    location: 'HSR Layout'
  },
  {
    id: '6',
    name: 'The Curry House',
    cuisines: ['North Indian', 'Punjabi', 'Mughlai'],
    rating: 4.1,
    deliveryTime: 32,
    priceForTwo: 500,
    imageUrl: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    discount: 'FREE delivery',
    location: 'Whitefield'
  }
];

export const menuItems: Record<string, MenuItem[]> = {
  '1': [
    {
      id: '101',
      name: 'Whopper',
      description: 'Our signature flame-grilled beef patty topped with juicy tomatoes, fresh lettuce, creamy mayonnaise, ketchup, crunchy pickles, and sliced white onions on a toasted sesame seed bun.',
      price: 199,
      imageUrl: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isVeg: false,
      isRecommended: true,
      category: 'Burgers'
    },
    {
      id: '102',
      name: 'Chicken Whopper',
      description: 'Flame-grilled chicken patty topped with fresh lettuce, mayo, and crowned with a toasted sesame seed bun.',
      price: 219,
      imageUrl: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isVeg: false,
      category: 'Burgers'
    },
    {
      id: '103',
      name: 'Veg Whopper',
      description: 'Our signature veg patty topped with fresh lettuce, mayo, and crowned with a toasted sesame seed bun.',
      price: 169,
      imageUrl: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isVeg: true,
      category: 'Burgers'
    },
    {
      id: '104',
      name: 'French Fries',
      description: 'Golden, crispy, and perfectly salted French fries.',
      price: 99,
      imageUrl: 'https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isVeg: true,
      isRecommended: true,
      category: 'Sides'
    }
  ],
  '2': [
    {
      id: '201',
      name: 'Chicken Biryani',
      description: 'Fragrant basmati rice cooked with tender chicken, aromatic spices, and herbs.',
      price: 299,
      imageUrl: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isVeg: false,
      isRecommended: true,
      category: 'Biryani'
    },
    {
      id: '202',
      name: 'Mutton Biryani',
      description: 'Fragrant basmati rice cooked with tender mutton, aromatic spices, and herbs.',
      price: 349,
      imageUrl: 'https://images.pexels.com/photos/12737908/pexels-photo-12737908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isVeg: false,
      category: 'Biryani'
    },
    {
      id: '203',
      name: 'Veg Biryani',
      description: 'Fragrant basmati rice cooked with fresh vegetables, aromatic spices, and herbs.',
      price: 249,
      imageUrl: 'https://images.pexels.com/photos/7353380/pexels-photo-7353380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      isVeg: true,
      category: 'Biryani'
    }
  ]
};

export const sampleOrders: Order[] = [
  {
    id: 'order1',
    restaurantId: '1',
    restaurantName: 'Burger King',
    items: [
      {
        ...menuItems['1'][0],
        quantity: 1
      },
      {
        ...menuItems['1'][3],
        quantity: 1
      }
    ],
    status: 'delivered',
    total: 298,
    deliveryAddress: {
      id: 'addr1',
      type: 'home',
      address: '123 Main St, Apartment 4B',
      landmark: 'Near Central Park'
    },
    timestamp: new Date('2023-09-15T18:30:00'),
    deliveryTime: 30
  }
];

export const locations = [
  'Koramangala',
  'Indiranagar',
  'HSR Layout',
  'Whitefield',
  'Electronic City',
  'Marathahalli',
  'Jayanagar',
  'JP Nagar',
  'BTM Layout'
];