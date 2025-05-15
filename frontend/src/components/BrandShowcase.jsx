import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png' },
  { name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png' },
  { name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/2560px-Sony_logo.svg.png' },
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/488px-Apple_logo_black.svg.png' },
  { name: 'Philips', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Philips_logo_new.svg/2560px-Philips_logo_new.svg.png' },
  { name: 'Panasonic', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Panasonic_logo.svg/1280px-Panasonic_logo.svg.png' },
];

const BrandShowcase = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-center mb-8"
        >
          Trusted Premium Brands
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center justify-center p-4 h-24 bg-gray-50 rounded-lg"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="max-h-10 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandShowcase;