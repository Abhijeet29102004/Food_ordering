import React from 'react';
import { Link } from 'react-router-dom';
import { menuItems } from '../../data/menuItems';
import { MenuItem as MenuItemType } from '../../types';
import { cn, formatCurrency, getDiscountedPrice } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';
import { Plus, Star } from 'lucide-react';

export const FeaturedItems: React.FC = () => {
  const { addItem } = useCartStore();
  const featuredItems = menuItems.filter(item => item.featured).slice(0, 4);

  const handleAddToCart = (item: MenuItemType) => {
    addItem({ ...item, quantity: 1 });
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Featured Menu Items</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most popular dishes loved by our customers. Made with the finest ingredients and crafted with care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/menu/${item.id}`} className="block relative pt-[60%] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {item.discount && item.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-primary-500 text-white text-sm font-medium px-2 py-1 rounded">
                    {item.discount}% OFF
                  </span>
                )}
              </Link>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Link to={`/menu/${item.id}`} className="font-medium text-lg hover:text-primary-500 transition-colors">
                    {item.name}
                  </Link>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium ml-1">{item.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    {item.discount && item.discount > 0 ? (
                      <div className="flex items-center">
                        <span className="font-bold text-primary-500">
                          {formatCurrency(getDiscountedPrice(item.price, item.discount))}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-primary-500">{formatCurrency(item.price)}</span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={cn(
                      "p-2 rounded-full bg-gray-100 hover:bg-primary-100 text-primary-500 transition-colors"
                    )}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/menu"
            className="inline-block px-6 py-3 bg-white border border-primary-500 text-primary-500 rounded-md hover:bg-primary-500 hover:text-white transition-colors duration-300"
          >
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
};