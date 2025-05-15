import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Smart 4K LED TV 55"',
    originalPrice: 199990,
    discountedPrice: 159990,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tag: 'HOT DEAL'
  },
  {
    id: 2,
    name: 'Air Conditioner Inverter 1.5 Ton',
    originalPrice: 149990,
    discountedPrice: 129990,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1585011664466-b765d87b811e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Refrigerator Double Door',
    originalPrice: 219990,
    discountedPrice: 189990,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    name: 'Washing Machine Front Load',
    originalPrice: 169990,
    discountedPrice: 139990,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tag: 'BESTSELLER'
  },
];

const ProductCard = ({ product, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-lg shadow-md overflow-hidden"
  >
    {/* Discount badge */}
    {product.discount > 0 && (
      <div className="absolute top-2 right-2 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-md">
        {product.discount}% OFF
      </div>
    )}
    
    {/* Product tag */}
    {product.tag && (
      <div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-md">
        {product.tag}
      </div>
    )}
    
    <Link to={`/product/${product.id || 'tv'}`} className="block">
      <div className="relative pt-[75%] bg-gray-100">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          src={product.image} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
        <button className="absolute top-2 right-2 p-2 rounded-full bg-white text-gray-500 hover:text-accent">
          <FiHeart />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
        <div className="flex items-center space-x-2">
          <span className="font-bold text-primary">Rs. {(product.discountedPrice).toLocaleString()}</span>
          {product.discount > 0 && (
            <span className="text-gray-500 text-sm line-through">Rs. {(product.originalPrice).toLocaleString()}</span>
          )}
        </div>
      </div>
    </Link>
    <div className="px-4 pb-4">
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="w-full mt-3 bg-primary text-white py-2 rounded-md font-medium"
      >
        Add to Cart
      </motion.button>
    </div>
  </motion.div>
);

const FeaturedProducts = ({ title, viewAll = false }) => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {viewAll && (
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center text-primary font-medium"
            >
              View All <FiChevronRight className="ml-1" />
            </motion.button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;