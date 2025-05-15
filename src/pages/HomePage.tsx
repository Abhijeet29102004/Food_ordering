import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Hero } from '../components/home/Hero';
import { FeaturedItems } from '../components/home/FeaturedItems';
import { CategorySection } from '../components/home/CategorySection';
import { InfoSection } from '../components/home/InfoSection';

export const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedItems />
      <CategorySection />
      <InfoSection />
    </Layout>
  );
};