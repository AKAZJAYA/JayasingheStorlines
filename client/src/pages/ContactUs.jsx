import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      // Reset form after a delay
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-10">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-10 rounded-xl transform -rotate-1"></div>
          <div className="relative bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                Contact Us
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              We'd love to hear from you! Whether you have a question about our products, services, or anything else, our team is ready to assist you.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Get in Touch</span>
            </h2>
            
            {formSubmitted ? (
              <motion.div 
                className="bg-green-50 p-8 rounded-xl border border-green-200 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiSend className="text-2xl text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">
                  Thank you for your message. We'll respond to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block mb-2 text-gray-700 font-medium">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="phone" className="block mb-2 text-gray-700 font-medium">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="subject" className="block mb-2 text-gray-700 font-medium">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block mb-2 text-gray-700 font-medium">Message</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FiMessageSquare className="text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      rows="5"
                      className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </motion.div>
                
                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" /> Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">Contact Information</span>
            </h2>
            
            <motion.div 
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="flex items-start">
                  <div className="p-3 bg-blue-100 rounded-full mr-4 text-blue-600">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Main Store Address</h3>
                    <p className="text-gray-600">123 Main Street, Colombo</p>
                    <p className="text-gray-600">Sri Lanka - 10000</p>
                    <a 
                      href="https://maps.google.com/?q=123+Main+Street+Colombo+Sri+Lanka" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="flex items-start">
                  <div className="p-3 bg-blue-100 rounded-full mr-4 text-blue-600">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Phone Numbers</h3>
                    <p className="text-gray-600">Customer Service: +94 112 222 888</p>
                    <p className="text-gray-600">Sales Inquiries: +94 112 222 889</p>
                    <p className="text-gray-600">Technical Support: +94 112 222 890</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="flex items-start">
                  <div className="p-3 bg-blue-100 rounded-full mr-4 text-blue-600">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email Addresses</h3>
                    <p className="text-gray-600">General Inquiries: info@jayasinghe.lk</p>
                    <p className="text-gray-600">Customer Support: support@jayasinghe.lk</p>
                    <p className="text-gray-600">Sales: sales@jayasinghe.lk</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                variants={itemVariants}
              >
                <div className="flex items-start">
                  <div className="p-3 bg-blue-100 rounded-full mr-4 text-blue-600">
                    <FiClock size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                    <p className="text-gray-600">Weekdays: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Weekends: 10:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Public Holidays: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-16 bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-100">Find Us On Map</h3>
          <div className="bg-gray-200 p-4 h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Interactive map would be embedded here</p>
              <a 
                href="https://maps.google.com/?q=123+Main+Street+Colombo+Sri+Lanka" 
                target="_blank" 
                rel="noopener noreferrer"
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <FiMapPin className="mr-2" /> View on Google Maps
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default ContactUs;