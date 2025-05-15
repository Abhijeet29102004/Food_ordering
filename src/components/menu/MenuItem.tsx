import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem as MenuItemType } from '../../types';
import { cn, formatCurrency, getDiscountedPrice } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';
import { Plus, Star } from 'lucide-react';

interface MenuItemProps {
  item: MenuItemType;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ ...item, quantity: 1 });
  };

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden animate-fade-in">
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
            onClick={handleAddToCart}
            className={cn(
              "p-2 rounded-full bg-gray-100 hover:bg-primary-100 text-primary-500 transition-colors"
            )}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};