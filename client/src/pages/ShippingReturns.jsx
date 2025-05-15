import React, { useState } from 'react';
import { FiTruck, FiRotateCcw, FiPackage, FiMap, FiAlertCircle, FiClock, FiPhone, FiMail, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

// If PageTransition component doesn't exist, create it first

const ShippingReturns = () => {
  // States for accordions
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const deliverySteps = [
    {
      title: "Order Confirmation",
      description: "Your order is confirmed and payment is processed.",
      icon: <FiPackage className="text-indigo-500" />,
      color: "bg-indigo-100"
    },
    {
      title: "Order Processing",
      description: "Your items are being prepared and packed for shipment.",
      icon: <FiClock className="text-blue-500" />,
      color: "bg-blue-100"
    },
    {
      title: "Shipment Dispatch",
      description: "Your package is handed over to our logistics partner.",
      icon: <FiTruck className="text-green-500" />,
      color: "bg-green-100"
    },
    {
      title: "On the Way",
      description: "Your package is in transit to your delivery address.",
      icon: <FiMap className="text-yellow-500" />,
      color: "bg-yellow-100"
    },
    {
      title: "Delivery",
      description: "Your package has been delivered to your specified address.",
      icon: <FiPackage className="text-emerald-500" />,
      color: "bg-emerald-100"
    }
  ];

  const accordionData = [
    {
      title: "Can I change my delivery address after placing an order?",
      content: "Yes, you can change your delivery address within 12 hours of placing your order, provided the order hasn't been processed for shipping yet. Please contact our customer service team immediately."
    },
    {
      title: "How do I track my shipment?",
      content: "Once your order is shipped, you'll receive a tracking number via email and SMS. You can enter this number on our Track Order page to monitor your delivery status in real-time."
    },
    {
      title: "What if I'm not available at the time of delivery?",
      content: "Our delivery team will call you before arrival. If you're not available, they will attempt delivery the next business day or leave the package with a neighbor (with your prior permission). After three unsuccessful attempts, the package will be returned to our warehouse."
    },
    {
      title: "How long do refunds take to process?",
      content: "Refunds typically take 7-10 business days to process after we receive the returned item. The time it takes for the funds to appear in your account depends on your bank or payment provider."
    }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section 
          className="relative mb-16 overflow-hidden rounded-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Element */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIgMS44LTQgNC00czQgMS44IDQgNC0xLjggNC00IDQtNC0xLjgtNC00eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between p-12 text-white z-10">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-5xl font-extrabold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Shipping & Returns
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl opacity-90 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                At Jayasinghe Storelines, we strive to make your shopping experience seamless, 
                from checkout to delivery and beyond.
              </motion.p>
            </div>
            <motion.div 
              className="h-40 w-40 md:h-48 md:w-48 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <div className="text-center">
                <FiTruck className="mx-auto text-5xl mb-2" />
                <p className="text-sm font-medium uppercase tracking-wider">Swift & Secure</p>
              </div>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Shipping Policy */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex items-center mb-8">
                <motion.div 
                  className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <FiTruck className="text-2xl text-blue-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                  Shipping Policy
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div 
                  className="bg-gray-50 p-6 rounded-xl"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Delivery Timeframes</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Colombo & Suburbs", time: "1-3 business days", color: "bg-blue-100" },
                      { title: "Other Areas in Sri Lanka", time: "3-5 business days", color: "bg-green-100" },
                      { title: "International Shipping", time: "7-14 business days", color: "bg-purple-100" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className={`${item.color} p-4 rounded-lg flex justify-between items-center`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="font-medium">{item.title}</span>
                        <span className="text-sm py-1 px-3 bg-white rounded-full shadow-sm">{item.time}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>* Limited countries only for international shipping</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-6 rounded-xl"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Shipping Costs</h3>
                  <div className="space-y-3">
                    {[
                      { area: "Colombo City", cost: "Free shipping on orders above Rs. 5,000" },
                      { area: "Colombo Suburbs", cost: "Free shipping on orders above Rs. 8,000" },
                      { area: "Other Areas", cost: "Free shipping on orders above Rs. 10,000" },
                      { area: "International", cost: "Calculated at checkout" }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="p-4 bg-white rounded-lg shadow-sm flex justify-between items-center"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="font-medium">{item.area}</span>
                        <span className="text-sm text-gray-600">{item.cost}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div 
                  className="bg-gray-50 p-6 rounded-xl"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Order Tracking</h3>
                  <p className="text-gray-700 mb-4">
                    Once your order is dispatched, you will receive a tracking number via email and SMS. You can track your order 
                    status through our order tracking system.
                  </p>
                  <motion.a 
                    href="/track-order" 
                    className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiPackage className="mr-2" /> Track Your Order
                  </motion.a>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-6 rounded-xl"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Delivery Process</h3>
                  <p className="text-gray-700 mb-4">
                    Our delivery team will contact you prior to delivery to confirm your availability. For large items 
                    (furniture, major appliances), our team will assist with basic installation where applicable.
                  </p>
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400 text-sm text-blue-800">
                    <p>
                      <strong>Note:</strong> Please ensure someone is available to receive the delivery at the specified address. 
                      Additional delivery attempts may incur extra charges.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Delivery Process Steps */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Our Delivery Process
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Track your order from warehouse to doorstep with our transparent delivery process.
            </p>
          </div>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-12 relative">
              {deliverySteps.map((step, index) => (
                <motion.div 
                  key={index}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  
                  <div className="relative">
                    <motion.div 
                      className={`h-16 w-16 rounded-full ${step.color} flex items-center justify-center z-10 relative`}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="text-2xl">{step.icon}</span>
                    </motion.div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white rounded-full transform scale-75 opacity-30"></div>
                  </div>
                  
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    {/* Empty div to maintain layout */}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        {/* Returns Policy */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex items-center mb-8">
                <motion.div 
                  className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1, rotate: -10 }}
                >
                  <FiRotateCcw className="text-2xl text-indigo-600" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-400">
                  Returns Policy
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div 
                  className="bg-gray-50 p-6 rounded-xl"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Return Eligibility</h3>
                  <p className="text-gray-700 mb-4">
                    Most products can be returned within 14 days of delivery, provided they meet the following conditions:
                  </p>
                  <div className="space-y-3">
                    {[
                      "Item is unused, undamaged, and in original packaging",
                      "All accessories, manuals, and free items are included",
                      "Original proof of purchase is available"
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-gray-50 p-6 rounded-xl"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Non-Returnable Items</h3>
                  <p className="text-gray-700 mb-4">
                    The following items cannot be returned unless they arrive damaged or defective:
                  </p>
                  <div className="space-y-3">
                    {[
                      "Custom-made or personalized items",
                      "Perishable goods",
                      "Sealed items that have been opened (for hygiene reasons)",
                      "Digital products or software that has been downloaded or accessed",
                      "Items marked as final sale or clearance"
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div 
                  className="bg-gray-50 p-6 rounded-xl"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">Return Process</h3>
                  <ol className="space-y-4">
                    {[
                      "Contact our customer service team to initiate a return",
                      "Fill out the return form provided by our team",
                      "Pack the item securely in its original packaging",
                      "Use the return shipping label provided or arrange for pickup",
                      "Refunds will be processed within 7-10 business days after we receive the item"
                    ].map((step, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-bold text-indigo-600">{index + 1}</span>
                        </div>
                        <span className="ml-3 text-gray-700">{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </motion.div>
                
                <div className="space-y-6">
                  <motion.div 
                    className="bg-gray-50 p-6 rounded-xl"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Refund Options</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { title: "Original Payment Method", icon: "💳" },
                        { title: "Store Credit (10% bonus)", icon: "🎁" },
                        { title: "Product Exchange", icon: "🔄" }
                      ].map((option, index) => (
                        <motion.div 
                          key={index}
                          className="bg-white p-4 rounded-lg text-center shadow-sm"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="text-sm font-medium">{option.title}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-50 p-6 rounded-xl"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Damaged or Defective Items</h3>
                    <p className="text-gray-700">
                      If you receive a damaged or defective item, please contact us within 48 hours of delivery. We will 
                      arrange for a replacement or refund at no additional cost to you.
                    </p>
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400 text-sm text-yellow-800">
                      <p>
                        <strong>Important:</strong> Please take photos of the damaged items in their original packaging
                        for faster processing of your claim.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* FAQ Accordion */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common shipping and return questions.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            {accordionData.map((item, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full p-6 text-left"
                >
                  <span className="font-semibold text-gray-800">{item.title}</span>
                  <motion.div
                    animate={{ rotate: activeAccordion === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="text-blue-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeAccordion === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-600">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.section>
        
        {/* Contact Section */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-8 py-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
                Our customer service team is ready to assist you with any questions regarding shipping and returns.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto">
                <motion.a 
                  href="tel:+94112222888" 
                  className="py-3 px-6 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPhone className="mr-2" /> Call Us: +94 112 222 888
                </motion.a>
                <motion.a 
                  href="mailto:support@jayasinghe.lk" 
                  className="py-3 px-6 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors font-medium flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMail className="mr-2" /> Email: support@jayasinghe.lk
                </motion.a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
};

export default ShippingReturns;