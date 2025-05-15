import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
  {
    id: 1,
    title: "Premium Lifestyle Solutions",
    subtitle: "Up to 40% off on all electronics and furniture",
    buttonText: "SHOP NOW",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-blue-600 to-blue-700",
  },
  {
    id: 2,
    title: "Modern Home Essentials",
    subtitle: "Luxury furniture with exclusive discounts",
    buttonText: "DISCOVER",
    image:
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-indigo-600 to-blue-700",
  },
  {
    id: 3,
    title: "Smart Living Starts Here",
    subtitle: "Latest tech gadgets for the modern home",
    buttonText: "EXPLORE",
    image:
      "https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-blue-700 to-indigo-600",
  },
];

const HeroBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const banner = banners[currentBanner];

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-gradient-to-r ${banner.color} h-full`}
        >
          <div className="container mx-auto px-4 h-full">
            <div className="flex flex-col md:flex-row items-center h-full">
              <div className="md:w-1/2 text-white z-10">
                <motion.h2
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-3xl md:text-5xl font-bold mb-4"
                >
                  {banner.title}
                </motion.h2>
                <motion.p
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-lg md:text-xl mb-6"
                >
                  {banner.subtitle}
                </motion.p>
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-secondary text-gray-900 px-6 py-3 rounded-md font-medium"
                >
                  {banner.buttonText}
                </motion.button>
              </div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="md:w-1/2 mt-8 md:mt-0 relative h-[300px] md:h-[400px] w-full"
              >
                <img
                  src={banner.image}
                  alt="Featured products"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-0 w-32 h-32 rounded-full bg-white opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-white opacity-10"></div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentBanner ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
