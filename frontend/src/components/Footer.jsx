import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import logoImg from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src={logoImg} 
                alt="Jayasinghe Storelines Logo" 
                className="h-10 w-auto"
              />
              <div className="ml-2">
                <h2 className="text-xl font-bold text-white">Jayasinghe</h2>
                <p className="text-xs text-gray-400">STORELINES (PVT) LTD</p>
              </div>
            </div>
            <p className="mb-4">Your premier destination for world-class electronics and furniture, offering exceptional quality, design, and value.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Special Offers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Payment Methods</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Warranty Information</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="mr-3 mt-1 text-primary" />
                <span>123 Main Street, Colombo, Sri Lanka - 10000</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 text-primary" />
                <span>+94 112 222 888</span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-primary" />
                <span>info@jayasinghe.lk</span>
              </li>
              <li className="flex items-start">
                <FiClock className="mr-3 mt-1 text-primary" />
                <div>
                  <p>Weekdays: 9am - 8pm</p>
                  <p>Weekends: 10am - 6pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} Jayasinghe Storelines (Pvt) Ltd. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="Visa" className="h-6 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Mastercard" className="h-6 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="American Express" className="h-6 w-auto" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196559.png" alt="Paypal" className="h-6 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;