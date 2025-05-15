import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { CartItem } from '../components/cart/CartItem';
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../lib/utils';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { items, clearCart, calculateTotal } = useCartStore();
  
  const subtotal = calculateTotal();
  const deliveryFee = items.length > 0 ? 2.99 : 0;
  const total = subtotal + deliveryFee;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingCart size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/menu"
              className="inline-block px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors font-medium"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Cart Items ({items.length})</h2>
                  <button
                    onClick={clearCart}
                    className="text-gray-500 hover:text-red-500 text-sm font-medium transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div className="divide-y">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">{formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary-500">{formatCurrency(total)}</span>
                  </div>
                </div>
                
                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-md font-medium transition-colors mt-4 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                
                <Link
                  to="/menu"
                  className="w-full text-center block mt-4 text-primary-500 hover:text-primary-600 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};