import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiInfo, FiShield, FiUser, FiTruck, FiRefreshCw, FiCpu, FiCode, FiFlag, FiGlobe, FiBriefcase, FiBell, FiMail, FiHome } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';

const TermsConditions = () => {
  const sections = [
    { 
      title: "1. Definitions", 
      icon: <FiInfo />,
      content: [
        "\"Company\", \"we\", \"us\", or \"our\" refers to Jayasinghe Storelines (Pvt) Ltd.",
        "\"Website\" refers to www.jayasinghe.lk and all associated subdomains.",
        "\"Services\" refers to any products, services, content, features, technologies, or functions offered by us.",
        "\"User\", \"you\", or \"your\" refers to individuals who access or use our Website or Services.",
        "\"Terms\" refers to these Terms and Conditions."
      ]
    },
    { 
      title: "2. Account Registration", 
      icon: <FiUser />,
      content: [
        "Provide accurate, current, and complete information.",
        "Maintain and promptly update your account information.",
        "Keep your password secure and confidential.",
        "Be responsible for all activities that occur under your account.",
        "Notify us immediately of any unauthorized use of your account."
      ]
    },
    { 
      title: "3. Products and Pricing", 
      icon: <FiBookOpen />,
      content: [
        "Correct any errors in pricing or product descriptions.",
        "Change prices, product specifications, and availability without notice.",
        "Limit the quantity of items purchased per order, per person, or per household.",
        "Refuse or cancel orders, including after they have been confirmed."
      ]
    },
    { 
      title: "4. Order Acceptance and Fulfillment", 
      icon: <FiShield />,
      content: [
        "Accept or decline your order for any reason.",
        "Verify your identity or shipping information before accepting an order.",
        "Cancel orders due to product unavailability, errors in pricing or product information, or suspected fraud."
      ]
    },
    { 
      title: "5. Payment Terms", 
      icon: <FiBookOpen />,
      content: [
        "You are authorized to use the payment method.",
        "The payment information you provide is accurate and complete.",
        "You authorize us to charge the payment method for the total amount of your order."
      ]
    },
    { 
      title: "6. Shipping and Delivery", 
      icon: <FiTruck />,
      content: [
        "Delivery times and shipping costs are estimates only and not guaranteed. Risk of loss and title for items pass to you upon delivery."
      ]
    },
    { 
      title: "7. Returns and Refunds", 
      icon: <FiRefreshCw />,
      content: [
        "Our return and refund policies are detailed in our Shipping & Returns Policy. By making a purchase, you agree to these policies."
      ]
    },
    { 
      title: "8. Intellectual Property", 
      icon: <FiCpu />,
      content: [
        "Use our content for commercial purposes without permission.",
        "Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information obtained from our Website."
      ]
    },
    { 
      title: "9. User Conduct", 
      icon: <FiCode />,
      content: [
        "Engage in any activity that violates applicable laws or regulations.",
        "Use our Website to transmit harmful code or interfere with its functionality.",
        "Impersonate any person or entity or misrepresent your affiliation with a person or entity.",
        "Collect or store personal data about other users without their consent.",
        "Engage in any activity that could harm minors."
      ]
    },
    { 
      title: "10. Limitation of Liability", 
      icon: <FiFlag />,
      content: [
        "To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our Website or Services."
      ]
    },
    { 
      title: "11. Disclaimer of Warranties", 
      icon: <FiShield />,
      content: [
        "Our Website and Services are provided \"as is\" and \"as available\" without any warranties, express or implied, including but not limited to, warranties of merchantability, fitness for a particular purpose, or non-infringement."
      ]
    },
    { 
      title: "12. Changes to Terms", 
      icon: <FiBell />,
      content: [
        "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our Website. Your continued use of our Website after any changes indicates your acceptance of the modified Terms."
      ]
    },
    { 
      title: "13. Governing Law", 
      icon: <FiGlobe />,
      content: [
        "These Terms shall be governed by and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions."
      ]
    },
    { 
      title: "14. Contact Information", 
      icon: <FiBriefcase />,
      content: [
        "Jayasinghe Storelines (Pvt) Ltd",
        "123 Main Street, Colombo",
        "Sri Lanka - 10000",
        "Email: legal@jayasinghe.lk",
        "Phone: +94 112 222 888"
      ]
    }
  ];

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-10">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-gray-700 opacity-10 rounded-xl transform -rotate-1"></div>
          <div className="relative bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full mr-4 text-blue-600">
                <FiBookOpen size={24} />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-800">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-gray-800">
                  Terms and Conditions
                </span>
              </h1>
            </div>
            
            <div className="flex items-center text-gray-600">
              <FiHome className="mr-2" />
              <p>Last Updated: June 1, 2023</p>
            </div>
            
            <motion.p 
              className="mt-6 text-lg text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Welcome to Jayasinghe Storelines. These Terms and Conditions govern your use of our website and services. 
              By accessing or using our website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, 
              please do not use our website or services.
            </motion.p>
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          {sections.map((section, index) => (
            <motion.section 
              key={index}
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-full mr-3 text-blue-600">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">{section.title}</h2>
              </div>
              
              <div className="ml-10 pl-4 border-l-2 border-gray-200">
                {section.title.includes("Account Registration") || 
                 section.title.includes("Products and Pricing") || 
                 section.title.includes("Order Acceptance") || 
                 section.title.includes("Payment Terms") || 
                 section.title.includes("User Conduct") ? (
                  <>
                    <p className="mb-4 text-gray-700">
                      {section.title.includes("Account Registration") && "To access certain features of our Website, you may need to register for an account. When you register, you agree to:"}
                      {section.title.includes("Products and Pricing") && "We strive to provide accurate product information and pricing, but errors may occur. We reserve the right to:"}
                      {section.title.includes("Order Acceptance") && "Your receipt of an order confirmation does not constitute our acceptance of your order. We reserve the right to:"}
                      {section.title.includes("Payment Terms") && "We accept various payment methods as indicated on our Website. By providing payment information, you represent that:"}
                      {section.title.includes("User Conduct") && "When using our Website, you agree not to:"}
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700">
                      {section.content.map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i, duration: 0.3 }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </>
                ) : section.title.includes("Contact Information") ? (
                  <address className="not-italic mb-8 text-gray-700 space-y-1">
                    {section.content.map((item, i) => (
                      <motion.p 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i, duration: 0.3 }}
                      >
                        {item}
                      </motion.p>
                    ))}
                  </address>
                ) : section.title.includes("Intellectual Property") ? (
                  <>
                    <p className="mb-4 text-gray-700">
                      All content on our Website, including text, graphics, logos, images, and software, is our property or the property of our licensors and is protected by copyright,
                      trademark, and other intellectual property laws. You may not:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mb-6 text-gray-700">
                      {section.content.map((item, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i, duration: 0.3 }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    {section.content.map((item, i) => (
                      <motion.p 
                        key={i} 
                        className="mb-4 text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i, duration: 0.3 }}
                      >
                        {item}
                      </motion.p>
                    ))}
                    
                    {section.title.includes("Shipping and Delivery") && (
                      <motion.p 
                        className="mb-4 text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        For more information, please refer to our <a href="/shipping-returns" className="text-blue-600 hover:underline">Shipping & Returns Policy</a>.
                      </motion.p>
                    )}
                    
                    {section.title.includes("Returns and Refunds") && (
                      <motion.p 
                        className="mb-4 text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        Our return and refund policies are detailed in our <a href="/shipping-returns" className="text-blue-600 hover:underline">Shipping & Returns Policy</a>.
                      </motion.p>
                    )}
                  </>
                )}
              </div>
            </motion.section>
          ))}
          
          <motion.div 
            className="bg-blue-50 p-8 rounded-xl border border-blue-100 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <FiMail className="text-blue-600 mr-3 text-xl" />
              <h3 className="text-xl font-semibold text-gray-800">Have Questions?</h3>
            </div>
            <p className="mb-4 text-gray-700">
              If you have any questions about these Terms and Conditions, please contact our legal team at:
            </p>
            <motion.a 
              href="mailto:legal@jayasinghe.lk"
              className="inline-flex items-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail className="mr-2" /> legal@jayasinghe.lk
            </motion.a>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TermsConditions;