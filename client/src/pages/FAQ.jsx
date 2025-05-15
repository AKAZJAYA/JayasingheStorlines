import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiPhone, FiMail } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';

const FAQ = () => {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept Visa, Mastercard, American Express, and PayPal. We also offer cash on delivery for orders within Colombo city limits."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to selected countries in South Asia. International shipping costs and delivery times vary depending on the destination. Please contact our customer service for more information."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 14-day return policy for most products. Items must be returned in their original packaging and in unused condition. Some products like custom furniture and special orders may have different return policies."
    },
    {
      question: "How long does delivery take?",
      answer: "For locations within Colombo, delivery typically takes 1-3 business days. For other areas in Sri Lanka, it takes 3-5 business days. International shipping may take 7-14 business days depending on the destination."
    },
    {
      question: "Do you offer warranty on your products?",
      answer: "Yes, all our electronic products come with at least a 1-year manufacturer warranty. Selected premium products may have extended warranty options. Furniture items typically come with a 6-month warranty against manufacturing defects."
    },
    {
      question: "Do you offer installation services?",
      answer: "Yes, we offer installation services for large appliances and furniture. Installation fees vary depending on the product and your location. Please inquire at the time of purchase."
    },
    {
      question: "Can I cancel my order?",
      answer: "Orders can be cancelled within 24 hours of placement, provided they have not been shipped yet. Please contact our customer service team as soon as possible if you wish to cancel your order."
    },
    {
      question: "Do you have physical stores?",
      answer: "Yes, we have 5 showrooms across Sri Lanka located in Colombo, Kandy, Galle, Negombo, and Jaffna. You can visit our stores to see our products in person before making a purchase."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-10">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-500 opacity-10 rounded-xl transform -rotate-1"></div>
          <div className="relative bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                Frequently Asked Questions
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Find answers to common questions about our products, services, and policies.
            </p>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.button
                  className="w-full text-left p-5 font-medium flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="text-blue-500" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 border-t border-gray-100 bg-gray-50">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Still Have Questions?</h2>
            <p className="mb-6 text-gray-600">
              If you couldn't find the answer to your question, please don't hesitate to contact our customer service team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                href="tel:+94112222888" 
                className="flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPhone className="mr-2" /> Call Us
              </motion.a>
              <motion.a 
                href="mailto:support@jayasinghe.lk" 
                className="flex items-center justify-center bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail className="mr-2" /> Email Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default FAQ;