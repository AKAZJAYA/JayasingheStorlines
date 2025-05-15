import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept Visa, Mastercard, American Express, and PayPal. We also offer cash on delivery for orders within Colombo city limits."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to selected countries in South Asia. International shipping costs and delivery times vary depending on the destination. Please contact our customer service for more information."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 14-day return policy for most products. Items must be returned in their original packaging and in unused condition. Some products like custom furniture and special orders may have different return policies."
    },
    {
      question: "How long does delivery take?",
      answer: "For locations within Colombo, delivery typically takes 1-3 business days. For other areas in Sri Lanka, it takes 3-5 business days. International shipping may take 7-14 business days depending on the destination."
    },
    {
      question: "Do you offer warranty on your products?",
      answer: "Yes, all our electronic products come with at least a 1-year manufacturer warranty. Selected premium products may have extended warranty options. Furniture items typically come with a 6-month warranty against manufacturing defects."
    },
    {
      question: "Do you offer installation services?",
      answer: "Yes, we offer installation services for large appliances and furniture. Installation fees vary depending on the product and your location. Please inquire at the time of purchase."
    },
    {
      question: "Can I cancel my order?",
      answer: "Orders can be cancelled within 24 hours of placement, provided they have not been shipped yet. Please contact our customer service team as soon as possible if you wish to cancel your order."
    },
    {
      question: "Do you have physical stores?",
      answer: "Yes, we have 5 showrooms across Sri Lanka located in Colombo, Kandy, Galle, Negombo, and Jaffna. You can visit our stores to see our products in person before making a purchase."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded overflow-hidden"
            >
              <button
                className={`w-full text-left p-4 font-medium flex justify-between items-center ${activeIndex === index ? 'bg-blue-50' : 'bg-gray-50'}`}
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span>{activeIndex === index ? '−' : '+'}</span>
              </button>
              
              {activeIndex === index && (
                <div className="p-4 bg-white">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-10 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Still Have Questions?</h2>
          <p className="mb-4">
            If you couldn't find the answer to your question, please don't hesitate to contact our customer service team.
          </p>
          <div className="flex gap-4">
            <a 
              href="tel:+94112222888" 
              className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
            >
              Call Us
            </a>
            <a 
              href="mailto:support@jayasinghe.lk" 
              className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;