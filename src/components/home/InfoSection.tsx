import React from 'react';
import { Clock, Truck, CreditCard } from 'lucide-react';

export const InfoSection: React.FC = () => {
  const features = [
    {
      icon: <Clock className="h-10 w-10 text-primary-500" />,
      title: 'Fast Delivery',
      description: 'We deliver your food as quickly as possible, always hot and fresh.',
    },
    {
      icon: <Truck className="h-10 w-10 text-primary-500" />,
      title: 'Free Shipping',
      description: 'Enjoy free delivery on orders over $25 within our delivery area.',
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary-500" />,
      title: 'Secure Payment',
      description: 'Multiple payment options with secure processing for your convenience.',
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 p-3 bg-primary-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};