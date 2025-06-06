import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Smartphone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Zomato</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-red-500">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-red-500">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-red-500">Blog</Link></li>
              <li><Link to="/investor-relations" className="text-gray-600 hover:text-red-500">Investor Relations</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">For Restaurants</h3>
            <ul className="space-y-2">
              <li><Link to="/partner-with-us" className="text-gray-600 hover:text-red-500">Partner With Us</Link></li>
              <li><Link to="/apps" className="text-gray-600 hover:text-red-500">Apps For You</Link></li>
              <li><Link to="/business-app" className="text-gray-600 hover:text-red-500">Business App</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Learn More</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-red-500">Privacy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-red-500">Terms</Link></li>
              <li><Link to="/security" className="text-gray-600 hover:text-red-500">Security</Link></li>
              <li><Link to="/sitemap" className="text-gray-600 hover:text-red-500">Sitemap</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Social Links</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-500 hover:text-white transition-colors duration-300">
                <Instagram size={18} />
              </a>
            </div>
            <div className="flex items-center">
              <Smartphone size={18} className="text-gray-500 mr-2" />
              <a href="#" className="text-gray-600 hover:text-red-500">Download App</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8">
          <p className="text-gray-500 text-sm text-center">
            &copy; 2025 Zomato Clone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;