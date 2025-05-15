import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

export const CategorySection: React.FC = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Browse By Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide variety of delicious options organized by category
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/menu?category=${category.id}`}
              className="group relative overflow-hidden rounded-lg shadow-sm animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="pt-[100%] relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="text-white font-medium text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};