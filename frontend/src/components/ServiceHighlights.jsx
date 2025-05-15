import React from 'react';
import { motion } from 'framer-motion';
import { FiTruck, FiShield, FiCreditCard, FiHeadphones } from 'react-icons/fi';

const services = [
  {
    icon: <FiTruck size={32} />,
    title: 'Island-wide Delivery',
    description: 'Free delivery for all orders above Rs. 25,000'
  },
  {
    icon: <FiShield size={32} />,
    title: 'Extended Warranty',
    description: 'Up to 5 years warranty on select products'
  },
  {
    icon: <FiCreditCard size={32} />,
    title: 'Easy Payment',
    description: '0% interest installment plans available'
  },
  {
    icon: <FiHeadphones size={32} />,
    title: '24/7 Support',
    description: 'Expert assistance always available'
  }
];

const ServiceHighlights = () => {
  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center"
            >
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceHighlights;