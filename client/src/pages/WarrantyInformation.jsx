import React from 'react';
import { FiShield, FiAlertCircle, FiCheckCircle, FiHelpCircle, FiTool } from 'react-icons/fi';

const WarrantyInformation = () => {
  const warrantyCategories = [
    {
      category: "Electronics",
      coverage: "1-3 years manufacturer warranty",
      details: "Covers all manufacturing defects, excludes physical damage and water damage."
    },
    {
      category: "Home Appliances",
      coverage: "2-5 years manufacturer warranty",
      details: "Covers parts and labor for manufacturing defects, excludes consumable parts."
    },
    {
      category: "Furniture",
      coverage: "6 months warranty",
      details: "Covers manufacturing defects and structural issues, excludes normal wear and tear."
    },
    {
      category: "Mobile Phones",
      coverage: "1 year manufacturer warranty",
      details: "Covers hardware malfunctions, excludes accidental damage and software issues."
    },
    {
      category: "Computers & Laptops",
      coverage: "1 year manufacturer warranty",
      details: "Covers hardware defects, excludes software issues and user-caused damage."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Warranty Information</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-10">
        <div className="flex items-start">
          <FiAlertCircle className="text-blue-600 text-xl mt-1 mr-3" />
          <p>
            At Jayasinghe Storelines, we stand behind the quality of our products. All items sold through our store come 
            with warranty coverage to ensure your satisfaction and peace of mind with your purchase.
          </p>
        </div>
      </div>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FiShield className="text-blue-600 mr-3" />
          <span>Warranty Coverage By Product Category</span>
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-4 text-left">Product Category</th>
                <th className="px-6 py-4 text-left">Standard Warranty</th>
                <th className="px-6 py-4 text-left">What's Covered</th>
              </tr>
            </thead>
            <tbody>
              {warrantyCategories.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 border-t">{item.category}</td>
                  <td className="px-6 py-4 border-t">{item.coverage}</td>
                  <td className="px-6 py-4 border-t">{item.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FiCheckCircle className="text-blue-600 mr-3" />
          <span>Extended Warranty Options</span>
        </h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="mb-4">
            For additional peace of mind, we offer extended warranty plans on most products. These plans provide coverage 
            beyond the manufacturer's warranty period and often include additional benefits.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-medium mb-3">Basic Plan</h3>
              <p className="mb-3 text-sm text-gray-600">Extends manufacturer warranty by 1 year</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                <li>Covers manufacturing defects</li>
                <li>Parts and labor included</li>
                <li>Standard service response time</li>
              </ul>
              <p className="font-medium">Starting from Rs. 2,000</p>
            </div>
            
            <div className="border rounded-lg p-6 border-blue-200 bg-blue-50">
              <div className="absolute -mt-3 -ml-3 bg-blue-600 text-white text-xs py-1 px-2 rounded">
                POPULAR
              </div>
              <h3 className="text-xl font-medium mb-3">Premium Plan</h3>
              <p className="mb-3 text-sm text-gray-600">Extends manufacturer warranty by 2 years</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                <li>Covers manufacturing defects</li>
                <li>Parts and labor included</li>
                <li>Priority service response</li>
                <li>One-time accidental damage coverage</li>
              </ul>
              <p className="font-medium">Starting from Rs. 3,500</p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-medium mb-3">Elite Plan</h3>
              <p className="mb-3 text-sm text-gray-600">Extends manufacturer warranty by 3 years</p>
              <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                <li>Covers manufacturing defects</li>
                <li>Parts and labor included</li>
                <li>24-hour service response</li>
                <li>Multiple accidental damage coverage</li>
                <li>Power surge protection</li>
              </ul>
              <p className="font-medium">Starting from Rs. 5,000</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-sm">
            <strong>Note:</strong> Extended warranty prices vary based on product type, brand, and original price. Please ask our sales associates for the exact pricing for your specific product.
          </p>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FiHelpCircle className="text-blue-600 mr-3" />
          <span>Warranty Claim Process</span>
        </h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ol className="list-decimal pl-5 space-y-4">
            <li>
              <p className="font-medium">Contact Customer Service</p>
              <p className="text-gray-600">Reach out to our customer service team at +94 112 222 888 or email warranty@jayasinghe.lk to report the issue.</p>
            </li>
            <li>
              <p className="font-medium">Provide Purchase Details</p>
              <p className="text-gray-600">Have your invoice number, date of purchase, and product details ready. Our team will verify your warranty coverage.</p>
            </li>
            <li>
              <p className="font-medium">Product Evaluation</p>
              <p className="text-gray-600">Our technical team will evaluate the product either at your location or at our service center to determine if the issue is covered under warranty.</p>
            </li>
            <li>
              <p className="font-medium">Repair or Replacement</p>
              <p className="text-gray-600">Based on the evaluation, we will either repair the product or replace it according to warranty terms.</p>
            </li>
            <li>
              <p className="font-medium">Return of Product</p>
              <p className="text-gray-600">Once repaired or replaced, the product will be returned to you. For in-home services, our technicians will complete the repair at your location.</p>
            </li>
          </ol>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FiTool className="text-blue-600 mr-3" />
          <span>Service Centers</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-medium mb-2">Colombo Service Center</h3>
            <p className="text-sm mb-1">123 Main Street, Colombo 03</p>
            <p className="text-sm mb-1">Phone: +94 112 222 890</p>
            <p className="text-sm mb-3">Hours: Mon-Sat, 9AM - 6PM</p>
            <p className="text-xs text-gray-500">Primary service center for all products</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-medium mb-2">Kandy Service Center</h3>
            <p className="text-sm mb-1">45 Temple Road, Kandy</p>
            <p className="text-sm mb-1">Phone: +94 812 222 456</p>
            <p className="text-sm mb-3">Hours: Mon-Sat, 9AM - 6PM</p>
            <p className="text-xs text-gray-500">Electronics and appliances only</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-medium mb-2">Galle Service Center</h3>
            <p className="text-sm mb-1">78 Lighthouse Street, Galle</p>
            <p className="text-sm mb-1">Phone: +94 912 222 789</p>
            <p className="text-sm mb-3">Hours: Mon-Sat, 9AM - 6PM</p>
            <p className="text-xs text-gray-500">Electronics and appliances only</p>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-medium mb-2">What voids my warranty?</h3>
            <p>Your warranty may be voided if the product shows signs of:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Physical damage due to misuse or accidents</li>
              <li>Unauthorized repairs or modifications</li>
              <li>Removal or tampering with product serial numbers</li>
              <li>Usage not in accordance with product instructions</li>
              <li>Damage from natural disasters or power surges (unless covered by premium plans)</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-medium mb-2">Do I need to register my product for warranty?</h3>
            <p>
              Most products are automatically covered by the standard manufacturer warranty with your proof of purchase. 
              However, for extended warranty plans and certain premium brands, product registration is required. 
              Our sales associates will assist you with the registration process at the time of purchase.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-medium mb-2">Are international warranty services available?</h3>
            <p>
              Most brands provide international warranty coverage, but terms and conditions vary by manufacturer. 
              Please check with our customer service team for specific information about your product's international 
              warranty coverage.
            </p>
          </div>
        </div>
      </section>
      
      <div className="bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Need Warranty Assistance?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Our dedicated warranty support team is ready to help you with any warranty-related inquiries or claims.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <a 
            href="tel:+94112222888" 
            className="py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Call Warranty Support
          </a>
          <a 
            href="mailto:warranty@jayasinghe.lk" 
            className="py-3 px-6 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Email Warranty Team
          </a>
        </div>
      </div>
    </div>
  );
};

export default WarrantyInformation;