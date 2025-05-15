import React from 'react';
import { FiCreditCard, FiDollarSign, FiSmartphone, FiShield } from 'react-icons/fi';

const PaymentMethods = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Payment Methods</h1>
      
      <section className="mb-12">
        <p className="mb-8 text-lg">
          At Jayasinghe Storelines, we offer a variety of secure payment options to make your shopping experience 
          as convenient as possible. Choose the payment method that works best for you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FiCreditCard className="text-blue-600 text-2xl mr-3" />
              <h2 className="text-xl font-semibold">Credit & Debit Cards</h2>
            </div>
            <p className="mb-4">
              We accept all major credit and debit cards for online and in-store purchases.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-sm font-medium">Visa</span>
              </div>
              <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-sm font-medium">MasterCard</span>
              </div>
              <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-sm font-medium">Amex</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FiDollarSign className="text-blue-600 text-2xl mr-3" />
              <h2 className="text-xl font-semibold">Cash on Delivery</h2>
            </div>
            <p className="mb-4">
              Pay with cash when your order is delivered to your doorstep. Available for orders within Sri Lanka.
            </p>
            <p className="text-sm text-gray-600 italic">
              *Cash on Delivery is subject to verification and may not be available for all products or locations.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FiSmartphone className="text-blue-600 text-2xl mr-3" />
              <h2 className="text-xl font-semibold">Mobile Payment</h2>
            </div>
            <p className="mb-4">
              Use your mobile wallet or banking app for quick and secure payments.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <div className="w-24 h-10 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-sm font-medium">Apple Pay</span>
              </div>
              <div className="w-24 h-10 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-sm font-medium">Google Pay</span>
              </div>
              <div className="w-24 h-10 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-sm font-medium">FriMi</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FiDollarSign className="text-blue-600 text-2xl mr-3" />
              <h2 className="text-xl font-semibold">Bank Transfer</h2>
            </div>
            <p className="mb-4">
              Make a direct bank transfer to our account. Order processing will begin once payment is confirmed.
            </p>
            <p className="text-sm text-gray-600 mt-6">
              Bank details will be provided during checkout or upon request.
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Payment Process</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ol className="list-decimal pl-5 space-y-4">
            <li>
              <p className="font-medium">Select your items and proceed to checkout</p>
              <p className="text-gray-600">Add products to your cart and click the "Checkout" button when ready.</p>
            </li>
            <li>
              <p className="font-medium">Provide shipping and contact information</p>
              <p className="text-gray-600">Enter your delivery address and contact details.</p>
            </li>
            <li>
              <p className="font-medium">Choose your preferred payment method</p>
              <p className="text-gray-600">Select from the available payment options listed above.</p>
            </li>
            <li>
              <p className="font-medium">Complete the payment</p>
              <p className="text-gray-600">Follow the instructions to complete your payment securely.</p>
            </li>
            <li>
              <p className="font-medium">Receive order confirmation</p>
              <p className="text-gray-600">Once payment is processed, you'll receive an order confirmation via email.</p>
            </li>
          </ol>
        </div>
      </section>
      
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <FiShield className="text-blue-600 text-2xl mr-3" />
          <h2 className="text-2xl font-semibold">Secure Payments</h2>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg">
          <p className="mb-4">
            Your security is our priority. All payment transactions are encrypted and processed through secure payment gateways.
            We use industry-standard security protocols to ensure your personal and financial information remains protected.
          </p>
          <div className="flex flex-wrap gap-6 mt-6 justify-center">
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="h-12 w-12 mx-auto mb-2 flex items-center justify-center">
                <span>🔒</span>
              </div>
              <p className="text-center text-sm">SSL Encryption</p>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="h-12 w-12 mx-auto mb-2 flex items-center justify-center">
                <span>🛡️</span>
              </div>
              <p className="text-center text-sm">PCI Compliant</p>
            </div>
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="h-12 w-12 mx-auto mb-2 flex items-center justify-center">
                <span>👁️</span>
              </div>
              <p className="text-center text-sm">Fraud Monitoring</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Have Questions About Payment?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Our customer service team is ready to assist you with any questions regarding payments or transactions.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a 
            href="tel:+94112222888" 
            className="py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Call Us: +94 112 222 888
          </a>
          <a 
            href="mailto:payments@jayasinghe.lk" 
            className="py-3 px-6 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Email: payments@jayasinghe.lk
          </a>
        </div>
      </section>
    </div>
  );
};

export default PaymentMethods;