import React from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

const Newsletter = () => {
  return (
    <div className="py-14 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-4"
          >
            Join Our Newsletter
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-blue-100 mb-6"
          >
            Subscribe to receive updates, access to exclusive deals, and more.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row max-w-lg mx-auto"
          >
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-4 py-3 rounded-l-md text-gray-900 focus:outline-none sm:rounded-r-none"
            />
            <button className="mt-2 sm:mt-0 px-6 py-3 bg-secondary text-gray-900 font-medium rounded-md sm:rounded-l-none flex items-center justify-center">
              Subscribe <FiSend className="ml-2" />
            </button>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm text-blue-200 mt-4"
          >
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;