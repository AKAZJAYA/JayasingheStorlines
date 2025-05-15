import React from 'react';

const SpecialOffers = () => {
  const offers = [
    {
      title: "Summer Sale - 30% Off Electronics",
      description: "Beat the heat with cool discounts on all electronic items. Limited time offer!",
      endDate: "August 31, 2023",
      image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Buy 2 Get 1 Free on Kitchen Appliances",
      description: "Stock up your kitchen with our amazing Buy 2 Get 1 Free offer on select kitchen appliances.",
      endDate: "September 15, 2023",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Furniture Clearance - Up to 50% Off",
      description: "Revamp your home with our premium furniture at half the price. Clearance sale now on!",
      endDate: "While stocks last",
      image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Free Shipping on Orders Above Rs. 10,000",
      description: "Enjoy free shipping on all orders above Rs. 10,000. Valid for all locations in Sri Lanka.",
      endDate: "Ongoing",
      image: "https://images.unsplash.com/photo-1600393760012-102e3bf2fa16?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const coupons = [
    { code: "WELCOME15", discount: "15% off your first order", minSpend: "No minimum spend" },
    { code: "SAVE20", discount: "Rs. 2,000 off", minSpend: "Minimum spend Rs. 15,000" },
    { code: "FREESHIP", discount: "Free shipping", minSpend: "Minimum spend Rs. 8,000" }
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Special Offers</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Current Promotions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-2/5 h-48 md:h-auto">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 md:w-3/5">
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="mb-4 text-gray-600">{offer.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Ends: {offer.endDate}</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-12 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Discount Coupons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coupons.map((coupon, index) => (
            <div key={index} className="border border-dashed border-gray-300 p-6 rounded-lg bg-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-600">{coupon.discount}</h3>
                  <p className="text-sm text-gray-500">{coupon.minSpend}</p>
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded">
                  <span className="text-sm font-medium">Coupon</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <code className="bg-gray-100 px-3 py-1 rounded font-medium">{coupon.code}</code>
                <button className="text-blue-600 hover:text-blue-800">Copy Code</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <div className="bg-blue-600 text-white p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Subscribe for Exclusive Offers</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Be the first to know about our special promotions, new arrivals, and exclusive discounts. 
            Subscribe to our newsletter today!
          </p>
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow p-3 rounded-l text-gray-800"
            />
            <button className="bg-gray-900 text-white px-6 py-3 rounded-r hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpecialOffers;