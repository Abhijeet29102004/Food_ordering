import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { menuItems } from '../data/menuItems';
import { MenuItem } from '../types';
import { useCartStore } from '../store/cartStore';
import { formatCurrency, getDiscountedPrice, cn } from '../lib/utils';
import { Star, Clock, ChevronLeft, Plus, Minus, ShoppingCart } from 'lucide-react';

export const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  
  const [item, setItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundItem = menuItems.find(item => item.id === id);
      setItem(foundItem || null);
      setIsLoading(false);
    }, 300);
  }, [id]);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (item) {
      addItem({ ...item, quantity });
      // Show success feedback (you could implement a toast here)
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 mt-8 flex justify-center">
          <div className="animate-pulse w-full max-w-4xl">
            <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="h-24 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!item) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Item Not Found</h2>
          <p className="text-gray-600 mb-6">The item you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/menu')}
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </Layout>
    );
  }
  
  const actualPrice = item.discount ? getDiscountedPrice(item.price, item.discount) : item.price;
  const totalPrice = actualPrice * quantity;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-500 mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Details */}
          <div className="animate-fade-in">
            <div className="mb-2 flex items-center">
              <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full">
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </span>
              {item.discount && item.discount > 0 && (
                <span className="ml-2 text-sm font-medium px-2 py-1 bg-primary-500 text-white rounded-full">
                  {item.discount}% OFF
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 font-medium">{item.rating}</span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-gray-600">{item.reviews} reviews</span>
              <span className="mx-2 text-gray-300">•</span>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>{item.prepTime} min</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              {item.description}
            </p>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-end mb-2">
                <div>
                  {item.discount && item.discount > 0 ? (
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-primary-500">
                        {formatCurrency(actualPrice)}
                      </span>
                      <span className="ml-2 text-gray-500 line-through">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-primary-500">
                      {formatCurrency(item.price)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className={cn(
                    "p-2 rounded-full border border-gray-300",
                    quantity > 1 ? "text-gray-700 hover:bg-gray-100" : "text-gray-400 cursor-not-allowed"
                  )}
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="mx-4 font-medium text-lg w-8 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-md font-medium transition-colors"
            >
              <ShoppingCart className="mr-2" size={20} />
              Add to Cart - {formatCurrency(totalPrice)}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};