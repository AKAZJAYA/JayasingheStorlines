import React from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Thank you for your message. We'll respond shortly.");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea
                id="message"
                rows="5"
                className="w-full p-2 border border-gray-300 rounded"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <FiMapPin className="text-blue-600 mt-1 mr-4 text-xl" />
              <div>
                <h3 className="font-medium">Main Store Address</h3>
                <p>123 Main Street, Colombo,<br />Sri Lanka - 10000</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FiPhone className="text-blue-600 mt-1 mr-4 text-xl" />
              <div>
                <h3 className="font-medium">Phone Numbers</h3>
                <p>Customer Service: +94 112 222 888</p>
                <p>Sales Inquiries: +94 112 222 889</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FiMail className="text-blue-600 mt-1 mr-4 text-xl" />
              <div>
                <h3 className="font-medium">Email Addresses</h3>
                <p>General Inquiries: info@jayasinghe.lk</p>
                <p>Customer Support: support@jayasinghe.lk</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FiClock className="text-blue-600 mt-1 mr-4 text-xl" />
              <div>
                <h3 className="font-medium">Business Hours</h3>
                <p>Weekdays: 9:00 AM - 8:00 PM</p>
                <p>Weekends: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-medium mb-4">Find Us On Map</h3>
            <div className="bg-gray-200 p-4 text-center h-64 flex items-center justify-center">
              <p>Map would be embedded here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;