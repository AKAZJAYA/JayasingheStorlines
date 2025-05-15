import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiClock, FiMap, FiSearch, FiNavigation, FiInfo } from 'react-icons/fi';
import Newsletter from '../components/Newsletter';
import ServiceHighlights from '../components/ServiceHighlights';
import logo from '../assets/logo.png'; // Adjust the path as necessary

const StoreLocatorPage = () => {
  const [activeStore, setActiveStore] = useState('main');
  const [mapUrl, setMapUrl] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d907.5242510427423!2d80.08343246571202!3d7.606621296159215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2d5932be6648d%3A0xbb7951bc42583b17!2sJayasinghe%20Storelines%20-%20Main%20Branch%20Hettipola!5e0!3m2!1sen!2slk!4v1747310559763!5m2!1sen!2slk");

  const stores = [
    {
      id: 'main',
      name: 'Main Branch - Hettipola',
      address: '123 Main Street, Hettipola, Sri Lanka',
      phone: '+94 112 222 888',
      hours: 'Mon-Fri: 9am - 8pm, Sat-Sun: 10am - 6pm',
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d907.5242510427423!2d80.08343246571202!3d7.606621296159215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2d5932be6648d%3A0xbb7951bc42583b17!2sJayasinghe%20Storelines%20-%20Main%20Branch%20Hettipola!5e0!3m2!1sen!2slk!4v1747310559763!5m2!1sen!2slk"
    },
    // {
    //   id: 'colombo',
    //   name: 'Colombo Flagship Store',
    //   address: '78 Duplication Road, Colombo 03, Western 00300, Sri Lanka',
    //   phone: '+94 112 333 999',
    //   hours: 'Mon-Fri: 10am - 9pm, Sat-Sun: 10am - 7pm',
    //   mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7985117158204!2d79.84982797486777!3d6.9116203193486695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259512c71b13d%3A0x7969c39a09ee09b8!2sDuplication%20Rd%2C%20Colombo!5e0!3m2!1sen!2slk!4v1747310783372!5m2!1sen!2slk"
    // },
    // {
    //   id: 'kandy',
    //   name: 'Kandy City Center',
    //   address: '5 Temple Street, Kandy 20000, Sri Lanka',
    //   phone: '+94 812 444 777',
    //   hours: 'Mon-Sun: 9am - 7pm',
    //   mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.587042475333!2d80.63565257487281!3d7.291635714734505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae368dde25dbde1%3A0x4c724a39d58fe39d!2sKandy%20City%20Centre!5e0!3m2!1sen!2slk!4v1747310857051!5m2!1sen!2slk"
    // },
    // {
    //   id: 'galle',
    //   name: 'Galle Fort Outlet',
    //   address: '42 Lighthouse Street, Galle 80000, Sri Lanka',
    //   phone: '+94 912 555 666',
    //   hours: 'Mon-Sun: 10am - 6pm',
    //   mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.8434286057277!2d80.21504707485675!3d6.026522329585186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173a3a1ff9d95%3A0x7676ff312ab8b25!2sGalle%20Fort%2C%20Galle!5e0!3m2!1sen!2slk!4v1747310930868!5m2!1sen!2slk"
    // }
  ];

  const handleStoreSelect = (store) => {
    setActiveStore(store.id);
    setMapUrl(store.mapUrl);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/331990/pexels-photo-331990.jpeg')",
            filter: 'brightness(60%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-primary/60 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="text-white max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Find a Jayasinghe Storelines Near You
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl"
            >
              Explore our retail locations across Sri Lanka for premium electronics and furniture
            </motion.p>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/30 to-transparent text-white">
          <div className="container mx-auto px-4 py-3">
            <div className="text-sm">
              <Link to="/" className="hover:text-white/80">Home</Link>
              <span className="mx-2">/</span>
              <span className="font-medium">Store Locator</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Search and filter section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Our Retail Locations</h2>
            <div className="relative w-full md:w-72">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by city or address..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Store list */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-primary text-white">
                <h3 className="text-lg font-bold flex items-center">
                  <FiMapPin className="mr-2" /> Our Branches
                </h3>
              </div>
              <div className="divide-y">
                {stores.map((store) => (
                  <div 
                    key={store.id}
                    onClick={() => handleStoreSelect(store)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 
                      ${activeStore === store.id ? 'border-l-4 border-primary bg-blue-50' : ''}`}
                  >
                    <h4 className="font-bold text-gray-800">{store.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">{store.address}</p>
                    <div className="mt-2 flex items-center text-primary text-sm">
                      <FiNavigation className="mr-1" /> 
                      <span>View on map</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Store Info */}
            {stores.find(store => store.id === activeStore) && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6 mt-6"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {stores.find(store => store.id === activeStore).name}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FiMapPin className="mt-1 mr-3 text-primary" />
                    <span className="text-gray-700">
                      {stores.find(store => store.id === activeStore).address}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <FiPhone className="mr-3 text-primary" />
                    <span className="text-gray-700">
                      {stores.find(store => store.id === activeStore).phone}
                    </span>
                  </div>
                  
                  <div className="flex items-start">
                    <FiClock className="mt-1 mr-3 text-primary" />
                    <span className="text-gray-700">
                      {stores.find(store => store.id === activeStore).hours}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(stores.find(store => store.id === activeStore).address)}`}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="bg-primary text-white px-4 py-2 rounded-md flex items-center justify-center w-full"
                  >
                    <FiNavigation className="mr-2" /> Get Directions
                  </a>
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Map */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-[500px] md:h-[600px]">
              <iframe 
                src={mapUrl} 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Jayasinghe Storelines Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </motion.div>
        </div>
        
        {/* Highlights and Info Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Visiting Our Stores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <FiInfo className="text-primary text-xl" />
              </div>
              <h3 className="text-lg font-bold mb-2">Expert Assistance</h3>
              <p className="text-gray-600">
                Our knowledgeable staff are ready to help you find the perfect products for your home or office.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <FiMap className="text-primary text-xl" />
              </div>
              <h3 className="text-lg font-bold mb-2">Experience Center</h3>
              <p className="text-gray-600">
                Try before you buy! Our showrooms feature interactive displays where you can test our latest products.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                <FiClock className="text-primary text-xl" />
              </div>
              <h3 className="text-lg font-bold mb-2">Special Events</h3>
              <p className="text-gray-600">
                Visit our stores for exclusive product launches, demonstrations, and seasonal promotions.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Coming Soon / Expansion Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 bg-blue-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Coming Soon to Your City</h2>
              <p className="mb-6">
                We're expanding our retail presence across Sri Lanka. New showrooms opening soon in Negombo, Jaffna, and Matara.
              </p>
              <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-bold mb-2">Interested in franchise opportunities?</h3>
                <p className="mb-4 text-sm">
                  Become a part of the Jayasinghe Storelines family with our franchise program.
                </p>
                <button className="bg-white text-primary px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src={logo}
                alt="Modern store interior" 
                className="h-full w-full object-cover" 
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="mt-12">
        <ServiceHighlights />
      </div>
      <Newsletter />
    </div>
  );
};

export default StoreLocatorPage;