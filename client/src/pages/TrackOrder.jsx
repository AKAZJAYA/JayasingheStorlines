import React, { useState } from 'react';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState(null);

  // Sample tracking result for demo purposes
  const sampleTrackingData = {
    orderNumber: "ORD123456789",
    status: "In Transit",
    estimatedDelivery: "June 15, 2023",
    items: [
      { name: "Samsung 55\" Smart TV", qty: 1 },
      { name: "Sony Soundbar", qty: 1 }
    ],
    trackingEvents: [
      { date: "June 10, 2023 - 09:30 AM", status: "Order Dispatched", location: "Colombo Warehouse", icon: <FiTruck /> },
      { date: "June 09, 2023 - 02:15 PM", status: "Order Processed", location: "Colombo Warehouse", icon: <FiPackage /> },
      { date: "June 08, 2023 - 10:45 AM", status: "Payment Confirmed", location: "Online", icon: <FiCheckCircle /> },
      { date: "June 08, 2023 - 09:20 AM", status: "Order Placed", location: "Online", icon: <FiClock /> }
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTracking(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (orderNumber === 'ORD123456789' || orderNumber === '123456789') {
        setTrackingResult(sampleTrackingData);
      } else {
        setTrackingResult({ error: "Order not found. Please check your order number and email." });
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>
      
      <div className="max-w-3xl mx-auto">
        {!isTracking || (trackingResult && trackingResult.error) ? (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="mb-6">
              Enter your order number and the email address used for the order to track your package.
            </p>
            
            {trackingResult && trackingResult.error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md flex items-center">
                <FiAlertCircle className="mr-2" />
                <span>{trackingResult.error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="orderNumber" className="block mb-1">Order Number</label>
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="e.g. ORD123456789"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded"
                  placeholder="e.g. your@email.com"
                  required
                />
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Track Order
                </button>
              </div>
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
              <p className="mb-4">
                If you're having trouble tracking your order or have any questions, please contact our customer support:
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <a 
                  href="tel:+94112222888" 
                  className="py-2 px-4 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors text-center"
                >
                  Call: +94 112 222 888
                </a>
                <a 
                  href="mailto:support@jayasinghe.lk" 
                  className="py-2 px-4 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors text-center"
                >
                  Email: support@jayasinghe.lk
                </a>
              </div>
            </div>
          </div>
        ) : (
          trackingResult && (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Order #{trackingResult.orderNumber}</h2>
                <span className={`py-1 px-3 rounded-full text-sm font-medium ${
                  trackingResult.status === "Delivered" ? "bg-green-100 text-green-800" : 
                  trackingResult.status === "In Transit" ? "bg-blue-100 text-blue-800" : 
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {trackingResult.status}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Estimated Delivery Date</h3>
                <p className="text-xl">{trackingResult.estimatedDelivery}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Order Items</h3>
                <ul className="list-disc pl-5">
                  {trackingResult.items.map((item, index) => (
                    <li key={index}>{item.name} x {item.qty}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Tracking History</h3>
                <div className="space-y-6">
                  {trackingResult.trackingEvents.map((event, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4">
                        <div className="h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                          {event.icon}
                        </div>
                        {index < trackingResult.trackingEvents.length - 1 && (
                          <div className="h-full w-0.5 bg-gray-200 mx-auto my-1"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                        <p className="text-sm text-gray-500">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => setIsTracking(false)}
                className="mt-8 py-2 px-4 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Track Another Order
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TrackOrder;