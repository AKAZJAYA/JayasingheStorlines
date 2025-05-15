import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiShield, 
  FiCreditCard, FiPackage, FiHeart, FiSettings, FiChevronRight,
  FiCamera, FiCalendar, FiCheckCircle
} from 'react-icons/fi';
import ServiceHighlights from '../components/ServiceHighlights';
import Newsletter from '../components/Newsletter';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  
  // Mock user data
  const user = {
    name: 'Chanaka Jayasinghe',
    email: 'chanaka@example.com',
    phone: '+94 71 234 5678',
    birthday: '1988-05-12',
    joinDate: 'July 2022',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    address: {
      street: '42 Temple Road',
      city: 'Colombo',
      province: 'Western',
      postalCode: '00300'
    },
    loyaltyPoints: 1250,
    loyaltyTier: 'Silver',
    paymentMethods: [
      { id: 1, type: 'Visa', last4: '4242', expiry: '05/25', isDefault: true },
      { id: 2, type: 'Mastercard', last4: '8888', expiry: '09/26', isDefault: false }
    ]
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6 flex items-center">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-900">My Profile</span>
        </div>
        
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
        >
          <div className="bg-blue-700 p-8 text-white relative">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="relative mb-6 md:mb-0 md:mr-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <button className="absolute bottom-0 right-0 bg-white text-primary p-1 rounded-full border border-gray-200">
                  <FiCamera size={16} />
                </button>
              </div>
              
              <div className="flex-grow">
                <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
                <div className="flex items-center text-white/80 text-sm mb-3">
                  <FiCalendar className="mr-2" />
                  <span>Member since {user.joinDate}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="px-3 py-1 bg-white/20 rounded-full text-sm flex items-center">
                    <FiCheckCircle className="mr-2" size={14} />
                    <span>Verified Account</span>
                  </div>
                  <div className="px-3 py-1 bg-white/20 rounded-full text-sm flex items-center">
                    {user.loyaltyTier} Member
                  </div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold">{user.loyaltyPoints}</div>
                  <div className="text-xs text-white/70">Loyalty Points</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('personal')}
              className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'personal' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Personal Info
            </button>
            <button 
              onClick={() => setActiveTab('addresses')}
              className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'addresses' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Addresses
            </button>
            <button 
              onClick={() => setActiveTab('payment')}
              className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'payment' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Payment Methods
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'security' ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Security
            </button>
          </div>
        </motion.div>
        
        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'personal' && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Personal Information</h2>
                  <button className="text-primary hover:underline flex items-center">
                    <FiEdit2 className="mr-2" size={16} /> Edit
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center text-gray-700 mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                          <FiUser className="text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Full Name</div>
                          <div className="font-medium">{user.name}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-700 mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                          <FiMail className="text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Email Address</div>
                          <div className="font-medium">{user.email}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center text-gray-700 mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                          <FiPhone className="text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Phone Number</div>
                          <div className="font-medium">{user.phone}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-700 mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                          <FiCalendar className="text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Birthday</div>
                          <div className="font-medium">{user.birthday}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6">
                  <h3 className="font-semibold mb-4">Account Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="marketing-emails"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="marketing-emails" className="ml-2 block text-sm text-gray-700">
                        Receive marketing emails with offers and new products
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="order-updates"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="order-updates" className="ml-2 block text-sm text-gray-700">
                        Receive SMS updates about your orders
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'addresses' && (
            <motion.div
              key="addresses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-bold">My Addresses</h2>
                  <button className="bg-primary text-white px-4 py-2 rounded-md font-medium text-sm">
                    + Add New Address
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-5 relative hover:border-primary transition-colors">
                      <div className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded-full">
                        Default
                      </div>
                      <h3 className="font-semibold mb-3">Home</h3>
                      <div className="text-gray-600 mb-4">
                        <div>{user.name}</div>
                        <div>{user.address.street}</div>
                        <div>{user.address.city}, {user.address.province} {user.address.postalCode}</div>
                        <div>Sri Lanka</div>
                        <div className="mt-2">{user.phone}</div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="text-primary hover:underline text-sm">Edit</button>
                        <button className="text-gray-500 hover:underline text-sm">Remove</button>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-5 relative hover:border-primary transition-colors">
                      <h3 className="font-semibold mb-3">Office</h3>
                      <div className="text-gray-600 mb-4">
                        <div>{user.name}</div>
                        <div>78 Duplication Road</div>
                        <div>Colombo 03, Western 00300</div>
                        <div>Sri Lanka</div>
                        <div className="mt-2">+94 71 987 6543</div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="text-primary hover:underline text-sm">Edit</button>
                        <button className="text-gray-500 hover:underline text-sm">Remove</button>
                        <button className="text-gray-500 hover:underline text-sm">Set as Default</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-xl font-bold">Payment Methods</h2>
                  <button className="bg-primary text-white px-4 py-2 rounded-md font-medium text-sm">
                    + Add New Card
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {user.paymentMethods.map(card => (
                      <div 
                        key={card.id} 
                        className={`border rounded-lg p-5 flex items-center ${card.isDefault ? 'border-primary' : 'border-gray-200'}`}
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                          {card.type === 'Visa' ? (
                            <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="Visa" className="h-8" />
                          ) : (
                            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Mastercard" className="h-8" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center">
                            <div className="font-medium">{card.type} •••• {card.last4}</div>
                            {card.isDefault && (
                              <span className="ml-3 text-xs text-primary font-medium">Default</span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">Expires {card.expiry}</div>
                        </div>
                        <div className="flex space-x-3">
                          <button className="text-primary hover:underline text-sm">Edit</button>
                          <button className="text-gray-500 hover:underline text-sm">Remove</button>
                          {!card.isDefault && (
                            <button className="text-gray-500 hover:underline text-sm">Set as Default</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold">Security Settings</h2>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center">
                        <FiShield className="mr-2 text-primary" />
                        Password
                      </h3>
                      <p className="text-gray-600 mb-3">
                        It's a good idea to use a strong password that you don't use elsewhere
                      </p>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md font-medium text-sm">
                        Change Password
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-semibold mb-3 flex items-center">
                        <FiSettings className="mr-2 text-primary" />
                        Two-Factor Authentication
                      </h3>
                      <p className="text-gray-600 mb-3">
                        Add an extra layer of security to your account by enabling two-factor authentication
                      </p>
                      <button className="bg-primary text-white px-4 py-2 rounded-md font-medium text-sm">
                        Enable 2FA
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="font-semibold mb-3 flex items-center text-red-600">
                        <FiSettings className="mr-2" />
                        Delete Account
                      </h3>
                      <p className="text-gray-600 mb-3">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <button className="border border-red-600 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md font-medium text-sm">
                        Delete My Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Link to="/my-orders" className="bg-white p-4 rounded-lg shadow-md flex items-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
              <FiPackage className="text-primary" size={20} />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium">My Orders</h3>
              <p className="text-sm text-gray-600">Track and manage your orders</p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </Link>
          
          <Link to="/wishlist" className="bg-white p-4 rounded-lg shadow-md flex items-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
              <FiHeart className="text-primary" size={20} />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium">My Wishlist</h3>
              <p className="text-sm text-gray-600">Browse your saved items</p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </Link>
          
          <Link to="/support" className="bg-white p-4 rounded-lg shadow-md flex items-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
              <FiShield className="text-primary" size={20} />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium">Support</h3>
              <p className="text-sm text-gray-600">Get help with your issues</p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </Link>
        </div>
      </div>
      
      <div className="mt-12">
        <ServiceHighlights />
      </div>
      <Newsletter />
    </div>
  );
};

export default ProfilePage;