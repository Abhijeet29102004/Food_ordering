import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { MenuFilter } from '../components/menu/MenuFilter';
import { MenuItem } from '../components/menu/MenuItem';
import { MenuItem as MenuItemType } from '../types';
import { menuItems } from '../data/menuItems';

export const MenuPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>([]);
  
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search')?.toLowerCase();

  useEffect(() => {
    let result = [...menuItems];
    
    // Filter by category
    if (categoryParam) {
      result = result.filter(item => item.category === categoryParam);
    }
    
    // Filter by search term
    if (searchParam) {
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(searchParam) || 
          item.description.toLowerCase().includes(searchParam) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchParam))
      );
    }
    
    setFilteredItems(result);
  }, [categoryParam, searchParam]);

  return (
    <Layout>
      <div className="pt-16">
        <MenuFilter />

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-2">
            {categoryParam 
              ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}`
              : 'Our Menu'}
          </h1>
          
          {searchParam && (
            <p className="mb-6 text-gray-600">
              Showing results for "{searchParam}"
            </p>
          )}

          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No items found</h2>
              <p className="text-gray-600">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};