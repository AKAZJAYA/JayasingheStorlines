import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiCheck, FiAlertCircle, FiInfo, FiTool, FiPackage, FiClock, FiHelpCircle, FiMail, FiPhone } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';

const WarrantyInformation = () => {
  const warranties = [
    { 
      category: "Electronics",
      period: "1-3 Years",
      coverage: [
        "Manufacturing defects",
        "Functional failures not caused by user",
        "Parts and labor for repairs"
      ],
      exclusions: [
        "Physical damage",
        "Water damage",
        "Unauthorized repairs",
        "Normal wear and tear"
      ]
    },
    { 
      category: "Home Appliances",
      period: "2-5 Years",
      coverage: [
        "Manufacturing defects",
        "Motor and compressor failures",
        "Electronic component failures",
        "Parts and labor for repairs"
      ],
      exclusions: [
        "Commercial use damage",
        "Improper installation",
        "Cosmetic damage",
        "Consumable parts (filters, bulbs)"
      ]
    },
    { 
      category: "Furniture",
      period: "6 Months - 1 Year",
      coverage: [
        "Manufacturing defects",
        "Structural integrity issues",
        "Material defects"
      ],
      exclusions: [
        "Fabric tears from misuse",
        "Wood scratches and dents",
        "Color fading from sunlight",
        "Assembly mistakes by customer"
      ]
    }
  ];

  const faqItems = [
    {
      question: "How do I claim warranty?",
      answer: "To claim warranty, please bring your product along with the original purchase receipt to any of our stores, or contact our customer service. You can also initiate a warranty claim through our online portal."
    },
    {
      question: "Do I need the original packaging for warranty claims?",
      answer: "While original packaging is helpful, it is not required for warranty claims. However, you will need to provide proof of purchase and the product serial number."
    },
    {
      question: "Can I transfer the warranty to someone else?",
      answer: "Standard manufacturer warranties are typically tied to the product and not the owner, so they can be transferred if the product is given or sold to someone else. However, extended warranties may have different terms."
    },
    {
      question: "What happens if my item can't be repaired?",
      answer: "If an item cannot be repaired under warranty, we will either replace it with an identical or similar model of equivalent value, or provide a store credit or refund depending on the warranty terms."
    },
    {
      question: "Do warranties cover international use?",
      answer: "Most manufacturer warranties are limited to the country of purchase. Using products abroad may void certain warranty protections. Please check the specific product warranty for details."
    }
  ];

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
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-500 opacity-10 rounded-xl transform -rotate-1"></div>
          <div className="relative bg-white p-8 rounded-xl shadow-lg">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-green-100 rounded-full mr-4 text-green-600">
                <FiShield size={24} />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-800">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                  Warranty Information
                </span>
              </h1>
            </div>
            
            <motion.p 
              className="mb-6 text-lg text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              At Jayasinghe Storelines, we stand behind the quality of our products. Our warranty policies are designed to provide 
              you with peace of mind and ensure your satisfaction with your purchase.
            </motion.p>
          </div>
        </div>
        
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiInfo className="mr-3 text-green-600" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
              Warranty Coverage by Product Category
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {warranties.map((warranty, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="h-2 bg-gradient-to-r from-green-500 to-blue-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{warranty.category}</h3>
                  <div className="mb-4 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {warranty.period} Warranty
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2 text-gray-700 flex items-center">
                      <FiCheck className="text-green-500 mr-2" /> What's Covered
                    </h4>
                    <ul className="space-y-1 pl-6 text-gray-600">
                      {warranty.coverage.map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="list-disc"
                          initial={{ opacity: 0, x: -5 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.05 * i, duration: 0.3 }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-gray-700 flex items-center">
                      <FiAlertCircle className="text-red-500 mr-2" /> What's Not Covered
                    </h4>
                    <ul className="space-y-1 pl-6 text-gray-600">
                      {warranty.exclusions.map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="list-disc"
                          initial={{ opacity: 0, x: -5 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.05 * i, duration: 0.3 }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiTool className="mr-3 text-green-600" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
              Warranty Claim Process
            </span>
          </h2>
          
          <div className="bg-white p-8 rounded-xl shadow-md">
            <ol className="relative border-l border-gray-200 ml-3 space-y-6">
              {[
                {
                  title: "Gather Documentation",
                  desc: "Collect your proof of purchase (receipt, invoice, order confirmation) and the product with its serial number.",
                  icon: <FiPackage />
                },
                {
                  title: "Contact Us",
                  desc: "Reach out through our customer service, visit one of our stores, or initiate a claim through our online portal.",
                  icon: <FiPhone />
                },
                {
                  title: "Product Assessment",
                  desc: "Our technicians will evaluate the product to determine if the issue is covered under warranty.",
                  icon: <FiTool />
                },
                {
                  title: "Resolution",
                  desc: "Depending on the assessment, we will repair, replace, or offer appropriate compensation as per the warranty terms.",
                  icon: <FiCheck />
                },
                {
                  title: "Follow-up",
                  desc: "We'll keep you informed throughout the process and notify you when your claim is resolved.",
                  icon: <FiClock />
                }
              ].map((step, index) => (
                <motion.li 
                  key={index} 
                  className="mb-10 ml-6"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-green-100 rounded-full -left-4 ring-4 ring-white text-green-600">
                    {step.icon}
                  </span>
                  <h3 className="font-medium text-lg text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.section>
        
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiHelpCircle className="mr-3 text-green-600" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
              Frequently Asked Warranty Questions
            </span>
          </h2>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="divide-y divide-gray-100">
              {faqItems.map((item, index) => (
                <motion.div 
                  key={index}
                  className="p-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h3 className="text-lg font-medium mb-2 text-gray-800 flex items-center">
                    <FiInfo className="text-green-500 mr-2 flex-shrink-0" />
                    {item.question}
                  </h3>
                  <p className="text-gray-600 ml-7">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        <motion.section 
          className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <FiShield className="mr-3 text-green-600" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
              Extended Warranty Options
            </span>
          </h2>
          
          <p className="mb-6 text-gray-700">
            For additional peace of mind, we offer extended warranty plans that provide coverage beyond the standard manufacturer warranty.
            Our extended warranties offer:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[
              {
                title: "Longer Coverage",
                desc: "Extend protection for up to 5 years from the date of purchase.",
                icon: <FiClock />
              },
              {
                title: "Additional Protection",
                desc: "Coverage for accidents, drops, spills, and other damages not typically covered.",
                icon: <FiShield />
              },
              {
                title: "Priority Service",
                desc: "Get faster repairs and replacements with our priority service channels.",
                icon: <FiTool />
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <p className="text-gray-700">
            Speak to our sales team or customer service representatives to learn more about our extended warranty options 
            and select the plan that best suits your needs.
          </p>
        </motion.section>
        
        <motion.section 
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
              Need More Information?
            </span>
          </h2>
          
          <p className="text-center text-gray-700 mb-8">
            Our customer service team is ready to assist you with any questions regarding our warranty policies.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <motion.a 
              href="tel:+94112222888" 
              className="py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPhone className="mr-2" /> Call Us: +94 112 222 888
            </motion.a>
            <motion.a 
              href="mailto:warranty@jayasinghe.lk" 
              className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail className="mr-2" /> Email: warranty@jayasinghe.lk
            </motion.a>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
};

export default WarrantyInformation;