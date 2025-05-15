import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories } from '../../data/categories';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export const MenuFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const currentCategory = searchParams.get('category') || 'all';
  
  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchParams.set('search', searchTerm.trim());
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  return (
    <div className="sticky top-16 z-20 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative w-full md:w-auto md:min-w-[300px]">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md bg-primary-500 text-white"
            >
              <Search size={16} />
            </button>
          </form>

          {/* Mobile Category Toggle */}
          <button
            className="md:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal size={18} className="mr-2" />
            Filter by Category
          </button>

          {/* Desktop Category Navigation */}
          <div className="hidden md:flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => handleCategoryClick('all')}
              className={cn(
                'px-4 py-2 rounded-md whitespace-nowrap transition-colors',
                currentCategory === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              )}
            >
              All Items
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  'px-4 py-2 rounded-md whitespace-nowrap transition-colors',
                  currentCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Category Menu */}
        {showMobileFilters && (
          <div className="md:hidden mt-4 grid grid-cols-2 gap-2 animate-slide-down">
            <button
              onClick={() => handleCategoryClick('all')}
              className={cn(
                'px-4 py-2 rounded-md text-center transition-colors',
                currentCategory === 'all'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              )}
            >
              All Items
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  'px-4 py-2 rounded-md text-center transition-colors',
                  currentCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};