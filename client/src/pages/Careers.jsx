import React from 'react';
import { FiUsers, FiDollarSign, FiClock, FiMapPin, FiStar } from 'react-icons/fi';

const Careers = () => {
  const openPositions = [
    {
      title: "Retail Sales Associate",
      department: "Sales",
      location: "Colombo",
      type: "Full-time",
      description: "We're looking for enthusiastic Retail Sales Associates to join our team and help customers find the perfect products for their needs."
    },
    {
      title: "Warehouse Supervisor",
      department: "Operations",
      location: "Colombo",
      type: "Full-time",
      description: "Oversee warehouse operations, inventory management, and staff to ensure efficient storage and delivery of products."
    },
    {
      title: "Digital Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Create and implement digital marketing strategies to increase brand awareness and drive online sales."
    },
    {
      title: "Customer Service Representative",
      department: "Customer Support",
      location: "Colombo/Kandy",
      type: "Full-time/Part-time",
      description: "Provide exceptional service to customers, assisting with inquiries, orders, and after-sales support."
    },
    {
      title: "IT Support Technician",
      department: "Information Technology",
      location: "Colombo",
      type: "Full-time",
      description: "Provide technical support to staff, maintain computer systems, and troubleshoot hardware and software issues."
    }
  ];

  const benefits = [
    { icon: <FiDollarSign />, title: "Competitive Salary", description: "We offer market-competitive salaries with performance-based bonuses." },
    { icon: <FiClock />, title: "Work-Life Balance", description: "Reasonable working hours, paid time off, and flexible scheduling options." },
    { icon: <FiStar />, title: "Career Growth", description: "Opportunities for advancement, training programs, and skill development." },
    { icon: <FiUsers />, title: "Team Environment", description: "Join a supportive, diverse, and collaborative workplace culture." }
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-8 rounded-lg mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Build Your Career With Us</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Join our team of passionate professionals dedicated to delivering exceptional products and service to our customers.
        </p>
      </div>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Why Work With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 text-2xl mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
        <div className="space-y-6">
          {openPositions.map((position, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-xl font-semibold">{position.title}</h3>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-2">
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
              <p className="mb-4">{position.description}</p>
              <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Our Hiring Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Application Review</h3>
            <p className="text-gray-600">
              Submit your application online. Our HR team will review your qualifications and experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Interview Process</h3>
            <p className="text-gray-600">
              Qualified candidates will be invited for interviews, which may include phone, video, and in-person rounds.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Offer & Onboarding</h3>
            <p className="text-gray-600">
              Selected candidates will receive offers and go through our comprehensive onboarding program.
            </p>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Don't See a Suitable Position?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          We're always looking for talented individuals to join our team. Send us your resume, and we'll keep it on file for future opportunities.
        </p>
        <button className="bg-blue-600 text-white py-3 px-8 rounded hover:bg-blue-700 transition-colors">
          Send Your Resume
        </button>
      </section>
    </div>
  );
};

export default Careers;