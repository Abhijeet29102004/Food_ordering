import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { useCartStore } from '../store/cartStore';

export const CheckoutPage: React.FC = () => {
  const { items } = useCartStore();
  const navigate = useNavigate();
  
  // Redirect to cart if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  if (items.length === 0) {
    return null;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <CheckoutForm />
      </div>
    </Layout>
  );
};