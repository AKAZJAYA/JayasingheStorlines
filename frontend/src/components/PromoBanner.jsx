import React from 'react';
import { motion } from 'framer-motion';

const PromoBanner = () => {
  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-700 to-indigo-600 rounded-xl overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 md:p-10 text-white">
              <motion.h2 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-bold mb-4"
              >
                Luxury Living Experience
              </motion.h2>
              <motion.p
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                Premium furniture and appliances starting from just Rs. 7,990 with up to 42% off!
              </motion.p>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true }}
                className="bg-secondary text-gray-900 px-6 py-2 rounded-md font-medium"
              >
                EXPLORE COLLECTION
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2 p-6"
            >
              <img 
                src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Luxury living room with premium furniture" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PromoBanner;