import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiHeart, FiShare2, FiTruck, FiPackage, FiShield } from 'react-icons/fi';
import ServiceHighlights from '../components/ServiceHighlights';
import FeaturedProducts from '../components/FeaturedProducts';
import Newsletter from '../components/Newsletter';

// Mock product data - in a real app, this would come from an API
const productData = {
  tv: {
    id: 'tv',
    name: 'LG 43 Inch UHD 4K Smart TV',
    brand: 'LG',
    model: '43UQ80GP5B',
    sku: 'LGTV43UF850P5B',
    originalPrice: 279999,
    discountedPrice: 199999,
    discount: 28,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565346090520-2da214d8b7c3?auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      display: '4K UHD (3,840 x 2,160)',
      processor: 'α5 AI Processor 4K Gen7',
      operatingSystem: 'webOS 24',
      features: ['AI Upscaling', 'Dynamic Tone Mapping', 'HDR10 / HLG'],
      connectivity: 'Wi-Fi, Bluetooth, HDMI, USB',
      dimensions: '964 x 574 x 89.9 mm (without stand)',
      warranty: '36 Months'
    },
    paymentOptions: [
      { bank: 'Sampath', monthly: 8334, logo: 'https://cdn-icons-png.flaticon.com/512/196/196566.png' },
      { bank: 'Nations Trust', monthly: 5889, logo: 'https://cdn-icons-png.flaticon.com/512/196/196566.png' },
      { bank: 'HSBC', monthly: 9584, logo: 'https://cdn-icons-png.flaticon.com/512/196/196566.png' },
      { bank: 'Commercial', monthly: 3450, logo: 'https://cdn-icons-png.flaticon.com/512/196/196566.png' },
      { bank: 'HNB', monthly: 8334, logo: 'https://cdn-icons-png.flaticon.com/512/196/196566.png' },
    ],
    offers: ['Free TV Stand', '0% Interest Installment Plans', '100-Day Price Guarantee'],
    deliveryOptions: {
      standard: '3 - 5 Working Days',
      pickup: 'Available Today',
    }
  },
  phone: {
    id: 'phone',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    model: 'SM-S928B/DS',
    sku: 'SAMS24U256GB',
    originalPrice: 399999,
    discountedPrice: 374999,
    discount: 6,
    images: [
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    specifications: {
      display: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      memory: '12GB RAM, 256GB Storage',
      camera: '200MP Main + 12MP Ultra Wide + 10MP Telephoto',
      battery: '5000mAh',
      features: ['S Pen', 'IP68 Water Resistance', 'Galaxy AI'],
      warranty: '12 Months'
    },
    paymentOptions: [
      { bank: 'Sampath', monthly: 10417, logo: 'https://cdn-icons-png.flaticon.com/512/196/196566.png' },
      { bank: 'Nations Trust', monthly: 7292, logo: 'https://cdn-icons-png.flaticon.com/512/196/196566.png' },
      { bank: 'HSBC', monthly: 11979, logo: 'https://cdn-icons-png.flaticon.com/512/196/196566.png' },
      { bank: 'Commercial', monthly: 8681, logo: 'https://cdn-icons-png.flaticon.com/512/196/196566.png' },
      { bank: 'HNB', monthly: 10417, logo: 'https://cdn-icons-png.flaticon.com/512/196/196566.png' },
    ],
    offers: ['Free Galaxy Buds', '0% Interest Installment Plans', 'Trade-in Discount Available'],
    deliveryOptions: {
      standard: '1 - 2 Working Days',
      pickup: 'Available Today',
    }
  }
};

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const product = productData[productId] || productData.tv; // Default to TV if product not found
  
  const formatter = new Intl.NumberFormat('en-US');
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <div className="text-sm text-gray-600">
            <span className="hover:text-primary cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="hover:text-primary cursor-pointer">{product.brand}</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product Info Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
              <motion.img
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={product.images[currentImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-accent text-white font-bold text-lg w-16 h-16 flex items-center justify-center rounded-full">
                  {product.discount}%<br/>OFF
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`cursor-pointer border-2 rounded-md overflow-hidden ${currentImage === index ? 'border-primary' : 'border-gray-200'}`}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-24 object-cover" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="lg:w-1/2">
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={`https://upload.wikimedia.org/wikipedia/commons/thumb/${product.brand === 'LG' ? 'b/bf/LG_logo_%282015%29.svg/2560px-LG_logo_%282015%29.svg.png' : 'c/c7/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png'}`} 
                alt={product.brand} 
                className="h-8"
              />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-baseline space-x-4 mb-4">
              <span className="text-2xl font-bold text-primary">Rs. {formatter.format(product.discountedPrice)}</span>
              {product.discount > 0 && (
                <span className="text-lg text-gray-500 line-through">Rs. {formatter.format(product.originalPrice)}</span>
              )}
            </div>
            
            <div className="flex flex-col border-t border-b border-gray-200 py-4 space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Model Number</span>
                <span className="font-medium">{product.model}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">SKU</span>
                <span className="font-medium">{product.sku}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Warranty</span>
                <span className="font-medium">{product.specifications.warranty}</span>
              </div>
            </div>
            
            {/* Easy Payment Plans */}
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Easy Payment Plans</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {product.paymentOptions.map((option, index) => (
                  <div key={index} className="border rounded-md p-2 text-center">
                    <img src={option.logo} alt={option.bank} className="h-6 mx-auto mb-1" />
                    <div className="text-xs font-medium">Monthly</div>
                    <div className="text-sm font-bold">Rs. {option.monthly}</div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-3 text-sm">
                or 3 x Rs. 66,667 with <span className="font-bold">BOLO</span>
              </div>
            </div>
            
            {/* Add to cart section */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
              <div className="flex border rounded-md">
                <button 
                  onClick={decrementQuantity} 
                  className="px-4 py-2 border-r"
                >
                  <FiMinus />
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  readOnly 
                  className="w-16 text-center focus:outline-none"
                />
                <button 
                  onClick={incrementQuantity} 
                  className="px-4 py-2 border-l"
                >
                  <FiPlus />
                </button>
              </div>
              
              <button className="flex-grow bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition-colors">
                ADD TO CART
              </button>
              
              <button className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors">
                BUY NOW
              </button>
            </div>
            
            {/* Wishlist and Share */}
            <div className="flex space-x-4 mb-6">
              <button className="flex items-center text-gray-600 hover:text-primary">
                <FiHeart className="mr-2" />
                Add To Wishlist
              </button>
              <button className="flex items-center text-gray-600 hover:text-primary">
                <FiShare2 className="mr-2" />
                Share Product
              </button>
            </div>
            
            {/* Delivery Options */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3 mb-6">
              <div className="flex items-center">
                <FiTruck className="text-primary mr-3" size={20} />
                <div>
                  <div className="font-medium">Standard Delivery</div>
                  <div className="text-sm text-gray-600">{product.deliveryOptions.standard} - Available</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <FiPackage className="text-primary mr-3" size={20} />
                <div>
                  <div className="font-medium">Pickup In-Store</div>
                  <div className="text-sm text-gray-600">{product.deliveryOptions.pickup}</div>
                </div>
              </div>
            </div>
            
            {/* Special Offers */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold flex items-center mb-3">
                <FiShield className="text-primary mr-2" />
                Special Offers
              </h3>
              <ul className="space-y-2 text-sm">
                {product.offers.map((offer, index) => (
                  <li key={index} className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    {offer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product description tabs */}
      <div className="bg-white border-t border-b border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex border-b mb-6 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'description' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('specification')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'specification' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
            >
              Specification
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-gray-600'}`}
            >
              Reviews
            </button>
          </div>
          
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <h2 className="text-xl font-bold mb-4">About {product.name}</h2>
              <p className="mb-4">
                Experience stunning 4K resolution and vibrant colors with the {product.name}. 
                Powered by the advanced {product.specifications.processor}, this {product.brand} 
                device delivers exceptional picture quality and smart features for an immersive viewing experience.
              </p>
              
              <div className="my-6">
                <img 
                  src="https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Product feature" 
                  className="rounded-lg w-full"
                />
              </div>
              
              <h3 className="text-lg font-bold mb-3">Key Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.specifications.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {activeTab === 'specification' && (
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div key={index} className="grid grid-cols-3 border-b border-gray-200 py-3">
                    <div className="font-medium text-gray-700 capitalize">{key}</div>
                    <div className="col-span-2">
                      {Array.isArray(value) ? (
                        <ul className="list-disc pl-5">
                          {value.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        value
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <div className="text-center py-8">
                <h3 className="text-xl font-bold mb-2">Customer Reviews</h3>
                <p className="text-gray-600 mb-6">Be the first to review this product</p>
                <button className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary-dark transition-colors">
                  Write a Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Product highlights */}
      <div className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Product Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg flex">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Superior Performance</h3>
                <p className="text-gray-600">
                  {product.brand === 'LG' ? 
                    `The α5 AI Processor 4K enhances colors and contrast for lifelike picture quality.` : 
                    `The Snapdragon 8 Gen 3 offers unprecedented speed and efficiency for all your tasks.`}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg flex">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Smart Features</h3>
                <p className="text-gray-600">
                  {product.brand === 'LG' ? 
                    `WebOS 24 provides access to streaming apps and a seamless user experience.` : 
                    `Galaxy AI delivers intelligent features that adapt to your needs and preferences.`}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg flex">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  Built with high-grade materials and backed by a comprehensive {product.specifications.warranty} warranty.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg flex">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Exclusive Benefits</h3>
                <p className="text-gray-600">
                  Enjoy special offers, easy payment plans, and premium service with your purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service highlights */}
      <ServiceHighlights />
      
      {/* Related products */}
      <FeaturedProducts title="You May Also Like" viewAll={false} />
      
      {/* Newsletter */}
      <Newsletter />
    </>
  );
};

export default ProductDetailsPage;