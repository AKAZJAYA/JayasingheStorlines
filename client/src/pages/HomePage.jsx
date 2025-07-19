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
import NewArrivals from "../components/NewArrivals";
import OnSaleProducts from "../components/OnSaleProducts";

const HomePage = () => {
  const { searchQuery } = useSearch();

  return (
    <>
      <AnimatePresence>{searchQuery && <SearchResults />}</AnimatePresence>

      <HeroBanner />

      {/* Service Highlights */}
      <ServiceHighlights />

      {/* Featured Categories */}
      <CategorySection />

      {/* New Arrivals */}
      <NewArrivals title="New Arrivals" limit={8} viewAll />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Top Selling Products */}
      <FeaturedProducts title="Featured Products" viewAll={true} />

      {/* Brand Showcase */}
      <BrandShowcase />

      {/* Testimonials */}
      <Testimonials />

      {/* Online Exclusive */}
      <OnSaleProducts title="On-SALE" limit={8} viewAll />

      {/* Newsletter */}
      <Newsletter />
    </>
  );
};

export default HomePage;
