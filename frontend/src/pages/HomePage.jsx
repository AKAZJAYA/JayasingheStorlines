import React from "react";
import HeroBanner from "../components/HeroBanner";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";
import PromoBanner from "../components/PromoBanner";
import ServiceHighlights from "../components/ServiceHighlights";
import Testimonials from "../components/Testimonials";
import BrandShowcase from "../components/BrandShowcase";
import Newsletter from "../components/Newsletter";
import { AnimatePresence } from "framer-motion";
import { useSearch } from "../context/SearchContext";
import SearchResults from "../components/SearchResults";

const HomePage = () => {
  const { searchQuery } = useSearch();
  
  return (
    <>
      <AnimatePresence>
        {searchQuery && <SearchResults />}
      </AnimatePresence>
      
      <HeroBanner />

      {/* Service Highlights */}
      <ServiceHighlights />

      {/* Featured Categories */}
      <CategorySection />

      {/* Featured Products */}
      <FeaturedProducts title="Latest Electronics" viewAll={true} />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Top Selling Products */}
      <FeaturedProducts title="Premium Furniture" viewAll={true} />

      {/* Brand Showcase */}
      <BrandShowcase />

      {/* Testimonials */}
      <Testimonials />

      {/* Online Exclusive */}
      <FeaturedProducts title="Special Offers" viewAll={true} />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
};

export default HomePage;