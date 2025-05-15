import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentMethod } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { formatCurrency } from '../../lib/utils';
import { CreditCard, MapPin, Truck, CircleDollarSign } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  paymentMethod: PaymentMethod;
  notes: string;
}

export const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart, calculateTotal } = useCartStore();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'credit-card',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would connect to an API
      // For now, we'll simulate a network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const orderId = Math.random().toString(36).substr(2, 9);
      clearCart();
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = calculateTotal();
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Customer Information */}
      <div>
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <MapPin className="text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold">Delivery Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address*
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
            </div>

            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code*
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 ${
                  errors.zip ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.zip && <p className="mt-1 text-sm text-red-500">{errors.zip}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <Truck className="text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold">Delivery Options</h2>
          </div>
          
          <div className="border border-gray-200 rounded-md p-4 mb-4 bg-gray-50">
            <div className="flex items-center">
              <input
                type="radio"
                id="standard-delivery"
                name="deliveryOption"
                checked
                readOnly
                className="h-4 w-4 text-primary-500 focus:ring-primary-500"
              />
              <label htmlFor="standard-delivery" className="ml-2 flex flex-col">
                <span className="text-sm font-medium">Standard Delivery</span>
                <span className="text-xs text-gray-500">Estimated delivery: 30-45 minutes</span>
              </label>
              <span className="ml-auto font-medium">{formatCurrency(deliveryFee)}</span>
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Instructions (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any special instructions for delivery..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <CircleDollarSign className="text-primary-500 mr-2" />
            <h2 className="text-xl font-semibold">Payment Method</h2>
          </div>
          
          <div className="space-y-3">
            <div 
              className={`border rounded-md p-4 cursor-pointer transition-all ${
                formData.paymentMethod === 'credit-card' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handlePaymentMethodChange('credit-card')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  id="credit-card"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'credit-card'}
                  onChange={() => handlePaymentMethodChange('credit-card')}
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="credit-card" className="ml-2 flex items-center cursor-pointer">
                  <CreditCard className="mr-2 h-5 w-5 text-gray-600" />
                  <span className="font-medium">Credit Card</span>
                </label>
              </div>
              
              {formData.paymentMethod === 'credit-card' && (
                <div className="mt-4 grid grid-cols-1 gap-4 animate-fade-in">
                  <p className="text-sm text-gray-600">
                    Card details would be collected here in a real application.
                  </p>
                </div>
              )}
            </div>

            <div 
              className={`border rounded-md p-4 cursor-pointer transition-all ${
                formData.paymentMethod === 'cash-on-delivery' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handlePaymentMethodChange('cash-on-delivery')}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  id="cash-on-delivery"
                  name="paymentMethod"
                  checked={formData.paymentMethod === 'cash-on-delivery'}
                  onChange={() => handlePaymentMethodChange('cash-on-delivery')}
                  className="h-4 w-4 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="cash-on-delivery" className="ml-2 cursor-pointer font-medium">
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="max-h-72 overflow-y-auto mb-4 pr-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between py-2 border-b border-gray-100">
                <div className="flex items-center">
                  <span className="font-medium mr-2">{item.quantity}×</span>
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">
                  {formatCurrency(
                    item.discount
                      ? getDiscountedPrice(item.price, item.discount) * item.quantity
                      : item.price * item.quantity
                  )}
                </span>
              </div>
            ))}
          </div>
          
          <div className="space-y-2 py-4 border-t border-b border-gray-200">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-medium">{formatCurrency(deliveryFee)}</span>
            </div>
          </div>
          
          <div className="flex justify-between py-4 font-bold text-lg">
            <span>Total</span>
            <span className="text-primary-500">{formatCurrency(total)}</span>
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-colors mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting || items.length === 0}
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            By placing your order, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </form>
  );
};