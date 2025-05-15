import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency, getDiscountedPrice } from '../../lib/utils';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  const itemPrice = item.discount ? getDiscountedPrice(item.price, item.discount) : item.price;
  const totalPrice = itemPrice * item.quantity;

  return (
    <div className="flex items-start py-4 border-b border-gray-200 animate-fade-in">
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-20 h-20 object-cover rounded-md"
      />
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.name}</h3>
          <button 
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{item.description}</p>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 text-gray-500 hover:text-primary-500 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="px-2 py-1 min-w-[2rem] text-center">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 text-gray-500 hover:text-primary-500 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <div className="text-right">
            {item.discount && item.discount > 0 ? (
              <div>
                <span className="font-medium text-primary-500">{formatCurrency(totalPrice)}</span>
                <span className="block text-xs text-gray-500">
                  {item.quantity > 1 && `${item.quantity} × ${formatCurrency(itemPrice)}`}
                </span>
              </div>
            ) : (
              <div>
                <span className="font-medium text-primary-500">{formatCurrency(totalPrice)}</span>
                <span className="block text-xs text-gray-500">
                  {item.quantity > 1 && `${item.quantity} × ${formatCurrency(item.price)}`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};