import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: "Chaminda Perera",
    role: "Interior Designer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Jayasinghe Storelines has been my go-to partner for all client projects. Their furniture collection is unmatched in quality and their electronics section offers the latest in technology. Exceptional service every time!",
    rating: 5
  },
  {
    id: 2,
    name: "Priyanka Mendis",
    role: "Homeowner",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "After renovating our home, we purchased all our appliances from Jayasinghe Storelines. Not only were the prices competitive, but the installation service was seamless. Highly recommend their premium service package.",
    rating: 5
  },
  {
    id: 3,
    name: "Rajith Fernando",
    role: "Tech Enthusiast",
    image: "https://randomuser.me/api/portraits/men/62.jpg",
    content: "As someone who values quality tech products, I appreciate how Jayasinghe Storelines only stocks premium brands. Their knowledgeable staff helped me set up my entire smart home system. The after-sales support is excellent too!",
    rating: 4
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  
  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900"
          >
            What Our Customers Say
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 w-20 bg-primary mx-auto mt-4"
          />
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[current].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-primary p-6 flex flex-col justify-center items-center text-white">
                  <img 
                    src={testimonials[current].image} 
                    alt={testimonials[current].name}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                  <h3 className="mt-4 text-xl font-semibold">{testimonials[current].name}</h3>
                  <p className="text-sm opacity-80">{testimonials[current].role}</p>
                  <div className="flex mt-3">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={`${i < testimonials[current].rating ? "text-yellow-300" : "text-white/30"}`} />
                    ))}
                  </div>
                </div>
                <div className="md:w-2/3 p-6 md:p-10 flex items-center">
                  <blockquote>
                    <p className="text-lg italic text-gray-700">" {testimonials[current].content} "</p>
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <button 
            onClick={prev}
            className="absolute top-1/2 -left-4 md:-left-6 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10"
          >
            <FiChevronLeft size={24} className="text-primary" />
          </button>
          
          <button 
            onClick={next}
            className="absolute top-1/2 -right-4 md:-right-6 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10"
          >
            <FiChevronRight size={24} className="text-primary" />
          </button>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2.5 h-2.5 rounded-full ${current === idx ? 'bg-primary' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;