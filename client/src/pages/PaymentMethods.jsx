import React from 'react';
import { FiCreditCard, FiDollarSign, FiSmartphone, FiShield,FiPhone,FiMail} from 'react-icons/fi';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const PaymentMethods = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-10 rounded-xl transform -rotate-1"></div>
          <div className="relative bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-800 flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Payment Methods</span>
              <motion.div 
                className="ml-4 text-blue-500" 
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
              >
                <FiCreditCard size={28} />
              </motion.div>
            </h1>
            
            <p className="mb-8 text-lg text-gray-600 max-w-3xl">
              At Jayasinghe Storelines, we offer a variety of secure payment options to make your shopping experience 
              as convenient as possible. Choose the payment method that works best for you.
            </p>
          </div>
        </div>
        
        <motion.section 
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <FiCreditCard className="text-blue-600 text-2xl" />
                </div>
                <h2 className="text-xl font-semibold">Credit & Debit Cards</h2>
              </div>
              <p className="mb-4 text-gray-600">
                We accept all major credit and debit cards for online and in-store purchases.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-10 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm"
                >
                  <span className="text-sm font-medium">Visa</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-10 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm"
                >
                  <span className="text-sm font-medium">MasterCard</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-10 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm"
                >
                  <span className="text-sm font-medium">Amex</span>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-full mr-4">
                  <FiSmartphone className="text-green-600 text-2xl" />
                </div>
                <h2 className="text-xl font-semibold">Mobile Payments</h2>
              </div>
              <p className="mb-4 text-gray-600">
                Use your mobile payment apps for contactless and secure transactions.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-10 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm"
                >
                  <span className="text-sm font-medium">Apple Pay</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-10 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm"
                >
                  <span className="text-sm font-medium">Google Pay</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-10 bg-gray-100 rounded-lg flex items-center justify-center shadow-sm"
                >
                  <span className="text-sm font-medium">FriMi</span>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-yellow-100 rounded-full mr-4">
                  <FiDollarSign className="text-yellow-600 text-2xl" />
                </div>
                <h2 className="text-xl font-semibold">Cash on Delivery</h2>
              </div>
              <p className="mb-4 text-gray-600">
                Pay with cash when your order is delivered to your doorstep (available for select locations).
              </p>
              <div className="mt-6 bg-yellow-50 p-3 rounded-lg text-sm text-yellow-800 border-l-4 border-yellow-400">
                <p>Available for orders within Colombo and suburban areas.</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-full mr-4">
                  <FiDollarSign className="text-purple-600 text-2xl" />
                </div>
                <h2 className="text-xl font-semibold">Bank Transfer</h2>
              </div>
              <p className="mb-4 text-gray-600">
                Make a direct bank transfer to our account. Order processing will begin once payment is confirmed.
              </p>
              <p className="text-sm text-gray-600 mt-6 bg-gray-50 p-3 rounded-lg border-l-4 border-gray-300">
                Bank details will be provided during checkout or upon request.
              </p>
            </motion.div>
          </div>
        </motion.section>
        
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Payment Process</span>
          </h2>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <ol className="relative border-l border-gray-200 ml-3">
              {[
                {title: "Select your items and proceed to checkout", desc: "Add products to your cart and click the \"Checkout\" button when ready."},
                {title: "Provide shipping and contact information", desc: "Enter your delivery address and contact details."},
                {title: "Choose your preferred payment method", desc: "Select from the available payment options listed above."},
                {title: "Complete the payment", desc: "Follow the instructions to complete your payment securely."},
                {title: "Receive order confirmation", desc: "Once payment is processed, you'll receive an order confirmation via email."}
              ].map((step, index) => (
                <motion.li 
                  key={index} 
                  className="mb-10 ml-6"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                    <span className="text-blue-600 font-bold">{index + 1}</span>
                  </span>
                  <h3 className="font-medium text-lg text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.section>
        
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <FiShield className="text-blue-600 text-2xl" />
            </div>
            <h2 className="text-2xl font-semibold">Secure Payments</h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl shadow-md">
            <p className="mb-6 text-gray-700">
              Your security is our priority. All payment transactions are encrypted and processed through secure payment gateways.
              We use industry-standard security protocols to ensure your personal and financial information remains protected.
            </p>
            <div className="flex flex-wrap gap-8 mt-8 justify-center">
              {[
                { icon: "🔒", label: "SSL Encryption" },
                { icon: "🛡️", label: "PCI Compliant" },
                { icon: "👁️", label: "Fraud Monitoring" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-5 rounded-xl shadow-sm flex flex-col items-center"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="h-12 w-12 mb-3 flex items-center justify-center text-2xl">
                    <span>{item.icon}</span>
                  </div>
                  <p className="text-center font-medium">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        <motion.section 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 p-10 rounded-xl text-center text-white shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Have Questions About Payment?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Our customer service team is ready to assist you with any questions regarding payments or transactions.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <motion.a 
              href="tel:+94112222888" 
              className="py-3 px-6 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPhone className="mr-2" /> Call Us: +94 112 222 888
            </motion.a>
            <motion.a 
              href="mailto:payments@jayasinghe.lk" 
              className="py-3 px-6 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail className="mr-2" /> Email: payments@jayasinghe.lk
            </motion.a>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
};

export default PaymentMethods;