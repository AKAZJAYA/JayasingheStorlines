import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiDollarSign, FiClock, FiMapPin, FiStar, FiChevronRight, FiMail, FiPhone, FiFileText, FiGlobe, FiAward, FiHeart } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  
  const departments = ['All', 'Sales', 'Operations', 'Marketing', 'Customer Support', 'IT', 'Finance'];
  
  const openPositions = [
    {
      title: "Retail Sales Associate",
      department: "Sales",
      location: "Colombo",
      type: "Full-time",
      description: "We're looking for enthusiastic Retail Sales Associates to join our team and help customers find the perfect products for their needs.",
      responsibilities: [
        "Engage with customers to understand their needs and provide product recommendations",
        "Process sales transactions and maintain accurate cash handling",
        "Arrange merchandise displays and keep the sales floor organized",
        "Stay informed about product features, benefits, and promotions"
      ],
      requirements: [
        "Previous retail sales experience preferred",
        "Strong customer service and communication skills",
        "Basic computer skills",
        "Ability to stand for extended periods and lift up to 20kg"
      ]
    },
    {
      title: "Warehouse Supervisor",
      department: "Operations",
      location: "Colombo",
      type: "Full-time",
      description: "Oversee warehouse operations, inventory management, and staff to ensure efficient storage and delivery of products.",
      responsibilities: [
        "Manage day-to-day warehouse operations and supervise staff",
        "Ensure accurate inventory control and optimize storage space",
        "Coordinate with delivery teams for efficient order fulfillment",
        "Implement safety protocols and maintain warehouse equipment"
      ],
      requirements: [
        "2+ years of warehouse management experience",
        "Strong leadership and organizational skills",
        "Experience with inventory management systems",
        "Knowledge of safety regulations and best practices"
      ]
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Create and implement digital marketing strategies to increase brand awareness and drive online sales.",
      responsibilities: [
        "Manage social media platforms and create engaging content",
        "Develop and execute email marketing campaigns",
        "Analyze campaign performance and provide insights",
        "Collaborate with design team for promotional materials"
      ],
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "2+ years of digital marketing experience",
        "Proficiency in social media platforms and analytics tools",
        "Experience with SEO, SEM, and email marketing"
      ]
    },
    {
      title: "Customer Service Representative",
      department: "Customer Support",
      location: "Colombo/Kandy",
      type: "Full-time/Part-time",
      description: "Provide exceptional service to customers, assisting with inquiries, orders, and after-sales support.",
      responsibilities: [
        "Respond to customer inquiries via phone, email, and live chat",
        "Process orders, returns, and exchanges",
        "Resolve customer complaints and escalate when necessary",
        "Maintain accurate records of all customer interactions"
      ],
      requirements: [
        "Previous customer service experience preferred",
        "Excellent communication and problem-solving skills",
        "Ability to remain calm in high-pressure situations",
        "Proficiency in MS Office and CRM software"
      ]
    },
    {
      title: "IT Support Technician",
      department: "IT",
      location: "Colombo",
      type: "Full-time",
      description: "Provide technical support to staff, maintain computer systems, and troubleshoot hardware and software issues.",
      responsibilities: [
        "Respond to IT support tickets and resolve technical issues",
        "Install and configure hardware and software",
        "Maintain network security and perform regular updates",
        "Train staff on new systems and applications"
      ],
      requirements: [
        "Technical degree or certification in IT or related field",
        "1+ years of IT support experience",
        "Knowledge of Windows, macOS, and basic networking",
        "Strong troubleshooting and problem-solving skills"
      ]
    },
    {
      title: "Financial Analyst",
      department: "Finance",
      location: "Colombo",
      type: "Full-time",
      description: "Analyze financial data, prepare reports, and provide insights to support business decision-making.",
      responsibilities: [
        "Prepare financial forecasts and budgets",
        "Analyze sales data and identify trends",
        "Create financial reports for management",
        "Support audit processes and ensure compliance"
      ],
      requirements: [
        "Bachelor's degree in Finance, Accounting, or related field",
        "2+ years of financial analysis experience",
        "Proficiency in Excel and financial software",
        "Strong analytical and problem-solving skills"
      ]
    }
  ];

  const filteredPositions = selectedDepartment === 'All' 
    ? openPositions 
    : openPositions.filter(position => position.department === selectedDepartment);

  const benefits = [
    { 
      icon: <FiDollarSign />, 
      title: "Competitive Salary", 
      description: "We offer market-competitive salaries with performance-based bonuses and regular reviews." 
    },
    { 
      icon: <FiClock />, 
      title: "Work-Life Balance", 
      description: "Reasonable working hours, paid time off, flexible scheduling options, and remote work opportunities." 
    },
    { 
      icon: <FiStar />, 
      title: "Career Growth", 
      description: "Clear career paths, training programs, mentorship, and continuous learning opportunities." 
    },
    { 
      icon: <FiUsers />, 
      title: "Team Environment", 
      description: "A supportive, diverse, and collaborative workplace culture that celebrates achievements." 
    },
    { 
      icon: <FiHeart />, 
      title: "Health Benefits", 
      description: "Comprehensive health insurance, wellness programs, and mental health support services." 
    },
    { 
      icon: <FiAward />, 
      title: "Recognition Programs", 
      description: "Employee recognition initiatives, service awards, and performance incentives." 
    },
    { 
      icon: <FiGlobe />, 
      title: "Diversity & Inclusion", 
      description: "A workplace that values diversity, promotes inclusion, and ensures equal opportunities." 
    },
    { 
      icon: <FiFileText />, 
      title: "Professional Development", 
      description: "Continued education support, conference attendance, and certification reimbursements." 
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

  const [selectedPosition, setSelectedPosition] = useState(null);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-10">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10 rounded-xl transform -rotate-1"></div>
          <div className="relative bg-white p-8 rounded-xl shadow-lg">
            <motion.h1 
              className="text-4xl font-extrabold mb-4 text-gray-800 flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Join Our Team
              </span>
              <motion.div 
                className="ml-4 text-blue-500" 
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, repeatType: "mirror", duration: 2 }}
              >
                <FiUsers size={28} />
              </motion.div>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Build your career with a team of passionate professionals dedicated to delivering exceptional products and services. 
              Discover opportunities for growth, learning, and making an impact in a supportive environment.
            </motion.p>
          </div>
        </div>
        
        {/* Company Values */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Why Work With Us</span>
            <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-600"></div>
          </h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.slice(0, 4).map((benefit, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {benefits.slice(4, 8).map((benefit, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
        
        {/* Life at Jayasinghe */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-40 h-40 bg-blue-100 rounded-full opacity-40"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-indigo-100 rounded-full opacity-40"></div>
            
            <div className="relative">
              <h2 className="text-3xl font-bold mb-6 relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Life at Jayasinghe</span>
                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-600"></div>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg mb-6">
                    At Jayasinghe Storelines, we believe that our people are our greatest asset. We foster a culture of innovation, 
                    collaboration, and excellence where every team member has the opportunity to grow professionally and personally.
                  </p>
                  <p className="text-lg mb-6">
                    Our diverse and inclusive workplace welcomes individuals from all backgrounds, bringing together 
                    different perspectives and ideas to serve our customers better and drive our business forward.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-8">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-blue-800 font-medium">Team Building</div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-blue-800 font-medium">Company Events</div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-blue-800 font-medium">Community Service</div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-blue-800 font-medium">Learning Sessions</div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-semibold mb-4">What Our Employees Say</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <p className="italic text-gray-600 mb-2">
                        "Joining Jayasinghe was the best career decision I've made. The supportive environment and growth opportunities have helped me advance from a sales associate to a department manager in just three years."
                      </p>
                      <p className="font-medium">- Nimal P., Department Manager</p>
                    </div>
                    <div className="border-l-4 border-indigo-500 pl-4 py-2">
                      <p className="italic text-gray-600 mb-2">
                        "What I appreciate most about working here is the emphasis on work-life balance and the collaborative team spirit. My colleagues are like a second family to me."
                      </p>
                      <p className="font-medium">- Amali D., Customer Service Team Lead</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Open Positions */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Open Positions</span>
            <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-600"></div>
          </h2>
          
          <div className="mb-8 flex flex-wrap gap-3">
            <span className="text-gray-700 font-medium">Filter by Department:</span>
            {departments.map((dept, index) => (
              <motion.button
                key={index}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedDepartment === dept 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedDepartment(dept)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {dept}
              </motion.button>
            ))}
          </div>
          
          {filteredPositions.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-xl text-center">
              <p className="text-gray-600 text-lg">No positions available in this department at the moment.</p>
              <p className="text-gray-600 mt-2">Please check back later or explore other departments.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPositions.map((position, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{position.title}</h3>
                    <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {position.department}
                      </span>
                      <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <FiMapPin className="mr-2" />
                    <span>{position.location}</span>
                  </div>
                  
                  <p className="mb-6 text-gray-600">{position.description}</p>
                  
                  <motion.button 
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
                    onClick={() => setSelectedPosition(position)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details <FiChevronRight className="ml-2" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Job Detail Modal */}
          {selectedPosition && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setSelectedPosition(null)}
            >
              <motion.div 
                className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{selectedPosition.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {selectedPosition.department}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {selectedPosition.type}
                        </span>
                      </div>
                    </div>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedPosition(null)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-600 mb-4">
                    <FiMapPin className="mr-2" />
                    <span>{selectedPosition.location}</span>
                  </div>
                  
                  <p className="mb-6 text-gray-700">{selectedPosition.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Key Responsibilities:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {selectedPosition.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Requirements:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      {selectedPosition.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <h4 className="text-lg font-semibold mb-2">How to Apply</h4>
                    <p className="text-gray-700 mb-4">
                      To apply for this position, please send your resume and cover letter to 
                      <a href="mailto:careers@jayasinghe.lk" className="text-blue-600 hover:underline"> careers@jayasinghe.lk</a> with the subject line:
                      <span className="font-medium"> {selectedPosition.title} - {selectedPosition.location}</span>
                    </p>
                  </div>
                  
                  <motion.button 
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.location.href = 'mailto:careers@jayasinghe.lk'}
                  >
                    Apply Now
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.section>
        
        {/* Hiring Process */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Our Hiring Process</span>
            <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-600"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Application Review",
                description: "Submit your application online. Our HR team will carefully review your qualifications and experience."
              },
              {
                step: 2,
                title: "Interview Process",
                description: "Qualified candidates will be invited for a series of interviews, which may include phone, video, and in-person rounds."
              },
              {
                step: 3,
                title: "Offer & Onboarding",
                description: "Selected candidates will receive offers and go through our comprehensive onboarding program to set you up for success."
              }
            ].map((step, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md relative overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mt-10 -mr-10 opacity-30"></div>
                <div className="relative">
                  <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Contact Section */}
        <motion.section 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-10 rounded-xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Don't See a Suitable Position?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume, and we'll keep it on file for future opportunities.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <motion.a 
              href="mailto:careers@jayasinghe.lk" 
              className="py-3 px-6 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMail className="mr-2" /> Send Your Resume
            </motion.a>
            <motion.a 
              href="tel:+94112222888" 
              className="py-3 px-6 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPhone className="mr-2" /> Call HR: +94 112 222 888
            </motion.a>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
};

export default Careers;