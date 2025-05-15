import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { formatCurrency } from '../lib/utils';
import { CheckCircle, Home, FileText } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // For demo purposes, generate a random estimated delivery time
  const currentTime = new Date();
  const estimatedDelivery = new Date(currentTime.getTime() + 45 * 60000); // 45 minutes from now
  const formattedTime = estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // For demo purposes, generate a random total
  const orderTotal = Math.floor(Math.random() * 5000 + 2000) / 100; // Random between $20 and $70
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Your order has been placed successfully. We've sent a confirmation to your email.
            </p>
          </div>
          
          <div className="border border-gray-200 rounded-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Order Details</h2>
              <span className="text-gray-500">#{orderId}</span>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-600">Order Date</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-medium">Today, {formattedTime}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-600">Order Total</span>
                <span className="font-medium">{formatCurrency(orderTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span>Credit Card</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-primary-50 rounded-md mb-8">
            <h3 className="font-medium mb-2">Delivery Information</h3>
            <p className="text-gray-600 text-sm">
              Track your order in real-time. Our delivery partner will call you when they're close.
            </p>
            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Order being prepared</span>
              </div>
              <div className="text-sm font-medium">45 min</div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
            <Link
              to="/"
              className="flex-1 flex items-center justify-center px-4 py-3 bg-white border border-gray-300 rounded-md text-gray-800 font-medium hover:bg-gray-50 transition-colors"
            >
              <Home className="mr-2" size={18} />
              Return Home
            </Link>
            <Link
              to="/orders"
              className="flex-1 flex items-center justify-center px-4 py-3 bg-primary-500 rounded-md text-white font-medium hover:bg-primary-600 transition-colors"
            >
              <FileText className="mr-2" size={18} />
              View Orders
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};