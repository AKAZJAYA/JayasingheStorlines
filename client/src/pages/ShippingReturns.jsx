import React from 'react';
import { FiTruck, FiRotateCcw, FiPackage, FiMap, FiAlertCircle } from 'react-icons/fi';

const ShippingReturns = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Shipping & Returns Policy</h1>
      
      <div className="mb-12">
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <div className="flex items-start">
            <FiAlertCircle className="text-blue-600 text-xl mt-1 mr-3" />
            <p>
              At Jayasinghe Storelines, we strive to make your shopping experience as smooth as possible. 
              Please take a moment to review our shipping and returns policies below.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-6">
            <FiTruck className="text-3xl text-blue-600 mr-4" />
            <h2 className="text-2xl font-semibold">Shipping Policy</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Delivery Timeframes</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Colombo & Suburbs: 1-3 business days</li>
                <li>Other Areas in Sri Lanka: 3-5 business days</li>
                <li>International Shipping: 7-14 business days (limited countries only)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Shipping Costs</h3>
              <p className="mb-2">Shipping costs are calculated based on the delivery location and product weight/dimensions:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Colombo City: Free shipping on orders above Rs. 5,000</li>
                <li>Colombo Suburbs: Free shipping on orders above Rs. 8,000</li>
                <li>Other Areas: Free shipping on orders above Rs. 10,000</li>
                <li>International: Calculated at checkout</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Order Tracking</h3>
              <p>
                Once your order is dispatched, you will receive a tracking number via email and SMS. You can track your order 
                status through our <a href="/track-order" className="text-blue-600 hover:underline">Order Tracking</a> page.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Delivery Process</h3>
              <p>
                Our delivery team will contact you prior to delivery to confirm your availability. For large items 
                (furniture, major appliances), our team will assist with basic installation where applicable.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <FiRotateCcw className="text-3xl text-blue-600 mr-4" />
            <h2 className="text-2xl font-semibold">Returns Policy</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Return Eligibility</h3>
              <p>Most products can be returned within 14 days of delivery, provided they meet the following conditions:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Item is unused, undamaged, and in original packaging</li>
                <li>All accessories, manuals, and free items are included</li>
                <li>Original proof of purchase is available</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Non-Returnable Items</h3>
              <p>The following items cannot be returned unless they arrive damaged or defective:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Custom-made or personalized items</li>
                <li>Perishable goods</li>
                <li>Sealed items that have been opened (for hygiene reasons)</li>
                <li>Digital products or software that has been downloaded or accessed</li>
                <li>Items marked as final sale or clearance</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Return Process</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Contact our customer service team to initiate a return</li>
                <li>Fill out the return form provided by our team</li>
                <li>Pack the item securely in its original packaging</li>
                <li>Use the return shipping label provided or arrange for pickup</li>
                <li>Refunds will be processed within 7-10 business days after we receive the item</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Refund Options</h3>
              <p>You may choose from the following refund options:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Original payment method refund</li>
                <li>Store credit (with 10% bonus value)</li>
                <li>Exchange for another product</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Damaged or Defective Items</h3>
              <p>
                If you receive a damaged or defective item, please contact us within 48 hours of delivery. We will 
                arrange for a replacement or refund at no additional cost to you.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Have Questions?</h2>
        <p className="text-center mb-6">
          Our customer service team is ready to assist you with any questions regarding shipping and returns.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a 
            href="tel:+94112222888" 
            className="py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-center"
          >
            Call Us: +94 112 222 888
          </a>
          <a 
            href="mailto:support@jayasinghe.lk" 
            className="py-3 px-6 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-center"
          >
            Email: support@jayasinghe.lk
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturns;