import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';

const OrderSuccessPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={32} className="text-green-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mt-6 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Your food is on its way. Sit back, relax, and enjoy the wait!
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-medium">#ZOM123456</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Estimated Delivery:</span>
            <span className="font-medium">25-30 mins</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link to="/orders">
            <Button variant="primary" fullWidth>
              Track Order
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="outline" fullWidth>
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 flex items-center justify-center">
          <span className="inline-block animate-bounce">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C14.5013 2 16.8912 2.79018 18.7782 4.21065C20.6652 5.63112 21.9382 7.60761 22.4135 9.80385C22.8888 12.0001 22.5315 14.2929 21.3969 16.2635C20.2622 18.2341 18.4194 19.7486 16.2001 20.5C15.4477 19.5406 14.5159 18.7343 13.4551 18.124C14.8599 17.8622 16.1532 17.1119 17.1146 16.0011C18.076 14.8903 18.6452 13.4815 18.7243 12.0013C18.8035 10.5212 18.3882 9.061 17.5426 7.85147C16.6969 6.64195 15.4679 5.74691 14.0635 5.30976C12.6592 4.87262 11.1574 4.91816 9.78127 5.43822C8.40514 5.95828 7.22707 6.92853 6.43243 8.20043C5.63779 9.47232 5.26796 10.9729 5.38021 12.4778C5.49246 13.9827 6.08086 15.4115 7.05838 16.5456C6.1126 17.2458 5.31869 18.1414 4.73022 19.1714C3.58907 17.7852 2.87384 16.0913 2.66654 14.2926C2.45924 12.4939 2.76958 10.677 3.55909 9.05111C4.3486 7.42522 5.58246 6.06106 7.12331 5.12818C8.66415 4.19531 10.4411 3.73523 12.24 3.8C12.16 3.8 12.08 2 12 2Z" fill="#CB202D"/>
              <path d="M14.86 15.14C13.43 16.57 13.43 18.93 14.86 20.36C15.84 21.34 17.68 21.57 19 21C18.43 19.56 18.2 17.75 19 16C19.87 14.24 21.7 13.33 23.34 13.37C22.68 11.76 21.67 10.34 20.36 9.14004C20.75 10.7 20.47 12.32 19.58 13.58C18.7 14.85 17.35 15.51 16 15.62C15.61 15.63 15.23 15.56 14.86 15.43V15.14Z" fill="#CB202D"/>
            </svg>
          </span>
          <p className="text-sm text-gray-500 ml-2">
            Thank you for ordering with Zomato!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;