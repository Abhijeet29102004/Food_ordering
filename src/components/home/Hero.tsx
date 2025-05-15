import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gray-900 text-white">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)', 
          backgroundPosition: 'center 40%',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight animate-slide-up">
            Delicious Food <span className="text-primary-500">Delivered</span> To Your Door
          </h1>
          <p className="text-lg mb-8 text-gray-300 leading-relaxed animate-slide-up" style={{ animationDelay: '100ms' }}>
            Fresh ingredients, tasty meals, and quick delivery. Enjoy restaurant-quality food in the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link 
              to="/menu" 
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center group"
            >
              Explore Menu
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
            </Link>
            <Link 
              to="/about" 
              className="bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};