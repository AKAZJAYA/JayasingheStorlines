import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiInfo, FiUsers, FiDatabase, FiLock, FiClock, FiGlobe, FiAlertCircle, FiMail, FiPhone } from 'react-icons/fi';
import PageTransition from '../components/PageTransition';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: <FiDatabase />,
      content: <>
        <h3 className="text-xl font-medium mt-6 mb-3">Personal Data</h3>
        <p className="mb-3">Personal data is information that identifies you as an individual. We may collect the following personal data:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Name, email address, phone number, and delivery address</li>
          <li>Payment information (card details are processed securely by our payment processors)</li>
          <li>Account login details</li>
          <li>Order history and preferences</li>
          <li>Communications with our customer service team</li>
        </ul>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Automatically Collected Information</h3>
        <p className="mb-3">When you visit our website, we may automatically collect:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>IP address and device information</li>
          <li>Browser type and version</li>
          <li>Pages visited and time spent on each page</li>
          <li>Referral source</li>
          <li>Operating system</li>
          <li>Date and time of access</li>
        </ul>
      </>
    },
    {
      id: "how-we-use-information",
      title: "How We Use Your Information",
      icon: <FiUsers />,
      content: <>
        <p className="mb-4">We may use the information we collect for various purposes, including to:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Process and fulfill your orders</li>
          <li>Create and manage your account</li>
          <li>Provide customer support</li>
          <li>Send transactional emails (order confirmations, shipping updates, etc.)</li>
          <li>Send marketing communications (with your consent)</li>
          <li>Improve our website and services</li>
          <li>Personalize your shopping experience</li>
          <li>Protect against fraud and unauthorized transactions</li>
          <li>Comply with legal obligations</li>
        </ul>
      </>
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      icon: <FiGlobe />,
      content: <>
        <p className="mb-4">
          We use cookies and similar tracking technologies to collect information about your browsing activities. Cookies are small text files
          that are stored on your device when you visit our website. They help us provide you with a better experience by enabling features like:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Remembering your preferences and settings</li>
          <li>Keeping you logged into your account</li>
          <li>Understanding how you use our website</li>
          <li>Providing personalized content and recommendations</li>
          <li>Analyzing website performance</li>
        </ul>
        <p className="mb-4">
          You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.
        </p>
      </>
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: <FiUsers />,
      content: <>
        <p className="mb-4">We may share your information with:</p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li><strong>Service Providers:</strong> Companies that provide services on our behalf, such as payment processing, shipping, customer service, and marketing.</li>
          <li><strong>Business Partners:</strong> With your consent, we may share your information with our business partners to offer you certain products, services, or promotions.</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information if required by law, legal process, or government request.</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
        </ul>
      </>
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: <FiLock />,
      content: <>
        <p className="mb-6">
          We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
          However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
        </p>
      </>
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: <FiClock />,
      content: <>
        <p className="mb-6">
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy,
          unless a longer retention period is required by law or to resolve disputes.
        </p>
      </>
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: <FiInfo />,
      content: <>
        <p className="mb-4">
          Depending on your location, you may have certain rights regarding your personal information, including:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>Access to your personal information</li>
          <li>Correction of inaccurate or incomplete information</li>
          <li>Deletion of your personal information</li>
          <li>Restriction of processing of your personal information</li>
          <li>Data portability</li>
          <li>Objection to processing of your personal information</li>
          <li>Withdrawal of consent</li>
        </ul>
        <p className="mb-4">
          To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
        </p>
      </>
    },
    {
      id: "childrens-privacy",
      title: "Children's Privacy",
      icon: <FiAlertCircle />,
      content: <>
        <p className="mb-6">
          Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children.
          If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
        </p>
      </>
    },
    {
      id: "changes",
      title: "Changes to This Privacy Policy",
      icon: <FiAlertCircle />,
      content: <>
        <p className="mb-6">
          We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date.
          We encourage you to review this Privacy Policy periodically to stay informed about our information practices.
        </p>
      </>
    },
    {
      id: "contact-us",
      title: "Contact Us",
      icon: <FiMail />,
      content: <>
        <p className="mb-6">
          If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
        </p>
        <address className="not-italic mb-8 space-y-2">
          <p>Jayasinghe Storelines (Pvt) Ltd</p>
          <p>123 Main Street, Colombo</p>
          <p>Sri Lanka - 10000</p>
          <p><FiMail className="inline mr-2" /> Email: <a href="mailto:privacy@jayasinghe.lk" className="text-blue-600 hover:underline">privacy@jayasinghe.lk</a></p>
          <p><FiPhone className="inline mr-2" /> Phone: <a href="tel:+94112222888" className="text-blue-600 hover:underline">+94 112 222 888</a></p>
        </address>
      </>
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
                <FiShield size={24} />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-800">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-gray-700">
                  Privacy Policy
                </span>
              </h1>
            </div>
            
            <div className="flex items-center text-gray-600">
              <FiClock className="mr-2" />
              <p>Last Updated: June 1, 2023</p>
            </div>
            
            <motion.p 
              className="mt-6 text-lg text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              At Jayasinghe Storelines, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website or make purchases from us. Please read this policy carefully to understand our practices regarding your personal data.
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Table of Contents - Sticky Sidebar */}
          <div className="md:w-1/4">
            <div className="sticky top-8">
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Table of Contents</h2>
                <ul className="space-y-2">
                  {sections.map((section, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      <a 
                        href={`#${section.id}`} 
                        className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                      >
                        <span className="text-xs mr-2">•</span> {section.title}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div 
                className="bg-blue-50 p-6 rounded-xl border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <h3 className="font-medium mb-2 flex items-center">
                  <FiAlertCircle className="text-blue-600 mr-2" />
                  Need Help?
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  If you have questions about our privacy practices or need to exercise your rights, please contact us.
                </p>
                <a 
                  href="mailto:privacy@jayasinghe.lk"
                  className="text-blue-600 text-sm font-medium hover:underline flex items-center"
                >
                  <FiMail className="mr-1" /> Contact Our Privacy Team
                </a>
              </motion.div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="prose prose-lg max-w-none">
                {sections.map((section, index) => (
                  <motion.section 
                    key={index}
                    id={section.id}
                    className="mb-10 pt-6 first:pt-0 border-t first:border-t-0 border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-semibold mb-4 flex items-center group">
                      <div className="p-2 bg-blue-100 rounded-full mr-3 text-blue-600">
                        {section.icon}
                      </div>
                      <span>{index + 1}. {section.title}</span>
                      <a href={`#${section.id}`} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-blue-400 hover:text-blue-600">#</span>
                      </a>
                    </h2>
                    
                    {section.content}
                  </motion.section>
                ))}
              </div>
            </div>
            
            <motion.div 
              className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold mb-3">Your Privacy Matters to Us</h3>
              <p className="text-gray-700">
                At Jayasinghe Storelines, we are committed to protecting your privacy and ensuring that your personal data is handled with care.
                If you have any concerns or require further information about how we process your data, please don't hesitate to contact us.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PrivacyPolicy;