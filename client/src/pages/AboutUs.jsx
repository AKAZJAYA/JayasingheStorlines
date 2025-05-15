import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiAward, FiMapPin, FiStar, FiCheck } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';

const AboutUs = () => {
  const milestones = [
    { year: 1985, title: "Our Beginning", description: "Founded as a small electronics shop in Colombo." },
    { year: 1995, title: "Expansion Begins", description: "Opened our second store and expanded product range." },
    { year: 2005, title: "Going Digital", description: "Launched our first online store to reach more customers." },
    { year: 2015, title: "National Presence", description: "Expanded to five stores across major cities in Sri Lanka." },
    { year: 2020, title: "Modern Transformation", description: "Revamped our brand and customer experience." }
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
        {/* Hero Section */}
        <motion.div 
          className="relative mb-16 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90"></div>
          <div className="relative z-10 py-20 px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Jayasinghe Storelines</h1>
            <p className="text-xl max-w-3xl text-blue-100">
              Sri Lanka's premier destination for world-class electronics and furniture since 1985. 
              A journey of innovation, quality, and exceptional customer service.
            </p>
          </div>
        </motion.div>
        
        {/* Our Story */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6 relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Our Story</span>
                  <div className="absolute -bottom-2 left-0 w-20 h-1 bg-blue-600"></div>
                </h2>
                <p className="mb-4 text-lg text-gray-700">
                  Founded in 1985, Jayasinghe Storelines has grown from a small family business to one of Sri Lanka's leading retailers of electronics and furniture. For over three decades, we have been committed to providing our customers with exceptional products, competitive prices, and outstanding service.
                </p>
                <p className="text-lg text-gray-700">
                  What started as a modest shop in Colombo has expanded to multiple locations across Sri Lanka, serving thousands of satisfied customers. Our growth is a testament to our unwavering dedication to quality and customer satisfaction.
                </p>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              <motion.div 
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-lg"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Our Journey Through Time</h3>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <motion.div 
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-blue-600 font-bold">
                        {milestone.year}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        {/* Our Mission */}
        <motion.section 
          className="mb-16 bg-white p-10 rounded-xl shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Our Mission</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600"></div>
          </h2>
          <p className="text-xl text-center text-gray-700 max-w-4xl mx-auto leading-relaxed">
            At Jayasinghe Storelines, our mission is to enhance the quality of life for our customers by offering innovative, high-quality products at competitive prices. We strive to create a shopping experience that is convenient, enjoyable, and tailored to meet the unique needs of each customer.
          </p>
          
          <div className="mt-12 flex justify-center">
            <motion.div 
              className="p-3 rounded-full bg-blue-100"
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.7)",
                  "0 0 0 10px rgba(59, 130, 246, 0)",
                  "0 0 0 0 rgba(59, 130, 246, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <FiStar className="text-blue-600 text-2xl" />
            </motion.div>
          </div>
        </motion.section>
        
        {/* Our Values */}
        <motion.section 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-10 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Our Values</span>
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-blue-600"></div>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-2 bg-blue-600"></div>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                  <FiUsers className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Customer Focus</h3>
                <p className="text-gray-700">
                  We put our customers at the center of everything we do, listening to their needs and continuously improving our offerings.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-2 bg-indigo-600"></div>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mb-5">
                  <FiAward className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Quality</h3>
                <p className="text-gray-700">
                  We are committed to offering only the highest quality products that meet our rigorous standards for durability and performance.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-2 bg-purple-600"></div>
              <div className="p-6">
                <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-5">
                  <FiCheck className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Integrity</h3>
                <p className="text-gray-700">
                  We conduct our business with honesty, transparency, and ethical practices, building trust with our customers and partners.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Our Team */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Our Team</span>
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-blue-600"></div>
          </h2>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-md">
            <p className="text-lg mb-6 text-gray-700">
              Our diverse team of professionals brings together a wealth of experience and expertise in retail, customer service, and product knowledge. We are united by our passion for delivering exceptional service and our commitment to the company's values.
            </p>
            <p className="text-lg text-gray-700">
              From our sales consultants who help you find the perfect product to our delivery and installation teams who ensure a seamless experience, every member of our team is dedicated to your satisfaction.
            </p>
            
            <motion.div 
              className="mt-8 border-t border-blue-200 pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { title: "Sales Professionals", count: "45+" },
                { title: "Customer Support Specialists", count: "20+" },
                { title: "Technicians & Installers", count: "25+" },
                { title: "Showroom Staff", count: "30+" },
                { title: "Logistics & Delivery", count: "15+" },
                { title: "Management Team", count: "12" }
              ].map((team, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-4 rounded-lg shadow-sm text-center"
                >
                  <h3 className="text-3xl font-bold text-blue-600 mb-1">{team.count}</h3>
                  <p className="text-gray-700">{team.title}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
        
        {/* Locations */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Our Locations</span>
            <div className="absolute -bottom-2 left-0 w-20 h-1 bg-blue-600"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { location: "Colombo Flagship Store", address: "123 Main Street, Colombo 03", phone: "+94 112 222 888" },
              { location: "Kandy Store", address: "45 Temple Road, Kandy", phone: "+94 812 222 456" },
              { location: "Galle Store", address: "78 Lighthouse Street, Galle", phone: "+94 912 222 789" },
              { location: "Negombo Store", address: "32 Beach Road, Negombo", phone: "+94 312 222 345" },
              { location: "Jaffna Store", address: "15 Hospital Road, Jaffna", phone: "+94 212 222 567" }
            ].map((store, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                    <FiMapPin />
                  </div>
                  <h3 className="text-xl font-semibold">{store.location}</h3>
                </div>
                <p className="mb-2 text-gray-600">{store.address}</p>
                <p className="text-gray-600">{store.phone}</p>
                <motion.a 
                  href={`https://maps.google.com/?q=${store.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
                  whileHover={{ x: 5 }}
                >
                  Get Directions →
                </motion.a>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
};

export default AboutUs;