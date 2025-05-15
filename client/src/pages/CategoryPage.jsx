import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiChevronDown } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import ServiceHighlights from '../components/ServiceHighlights';

// Mock category data
const categoryData = {
  electronics: {
    title: 'Electronics',
    description: 'Explore our wide range of electronic products from premium brands',
    bannerImage: 'https://images.pexels.com/photos/4112236/pexels-photo-4112236.jpeg',
    products: [
      { id: 1, name: 'Smart 4K LED TV 55"', price: 159990, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1' },
      { id: 2, name: 'Smartphone XZ Pro', price: 189990, image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca' },
      { id: 3, name: 'Bluetooth Speaker', price: 15990, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1' },
      { id: 4, name: 'Wireless Earbuds', price: 22990, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46' },
      { id: 5, name: 'Digital Camera', price: 89990, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32' },
      { id: 6, name: 'Gaming Console', price: 129990, image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f' },
    ]
  },
  furniture: {
    title: 'Furniture',
    description: 'Premium quality furniture for your home and office',
    bannerImage: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    products: [
      { id: 1, name: 'Modern Coffee Table', price: 45990, image: 'https://images.unsplash.com/photo-1634643836960-c345c8a82974' },
      { id: 2, name: 'Leather Sofa', price: 189990, image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e' },
      { id: 3, name: 'Dining Table Set', price: 125990, image: 'https://images.unsplash.com/photo-1617104678098-de229db51175' },
      { id: 4, name: 'Bed Frame Queen', price: 89990, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85' },
      { id: 5, name: 'Bookshelf', price: 35990, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156' },
      { id: 6, name: 'Office Desk', price: 55990, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd' },
    ]
  },
  appliances: {
    title: 'Appliances',
    description: 'Top-of-the-line home appliances for modern living',
    bannerImage: 'https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg',
    products: [
      { id: 1, name: 'Air Conditioner Inverter 1.5 Ton', price: 129990, image: 'https://images.unsplash.com/photo-1585011664466-b765d87b811e' },
      { id: 2, name: 'Refrigerator Double Door', price: 189990, image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5' },
      { id: 3, name: 'Washing Machine Front Load', price: 139990, image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1' },
      { id: 4, name: 'Microwave Oven', price: 42990, image: 'https://images.unsplash.com/photo-1585660891539-26af510af600' },
      { id: 5, name: 'Blender Pro', price: 18990, image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b' },
      { id: 6, name: 'Water Dispenser', price: 25990, image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473' },
    ]
  },
  cooling: {
    title: 'Cooling Solutions',
    description: 'Stay cool with our range of air conditioners and cooling systems',
    bannerImage: 'https://images.pexels.com/photos/3735210/pexels-photo-3735210.jpeg',
    products: [
      { id: 1, name: 'Split AC 1.5 Ton Inverter', price: 129990, image: 'https://images.unsplash.com/photo-1585011664466-b765d87b811e' },
      { id: 2, name: 'Tower Fan', price: 15990, image: 'https://images.unsplash.com/photo-1575156886859-952d1c8231c5' },
      { id: 3, name: 'Portable AC', price: 89990, image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae' },
      { id: 4, name: 'Ceiling Fan', price: 12990, image: 'https://images.unsplash.com/photo-1598024055266-9da2c4ea98a5' },
      { id: 5, name: 'Smart AC Controller', price: 8990, image: 'https://images.unsplash.com/photo-1597227772909-a6d166b48b79' },
      { id: 6, name: 'Window AC 1 Ton', price: 69990, image: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff' },
    ]
  },
  kitchen: {
    title: 'Kitchen Appliances',
    description: 'Modern kitchen appliances for the contemporary chef',
    bannerImage: 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg',
    products: [
      { id: 1, name: 'Gas Stove 4-Burner', price: 25990, image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1' },
      { id: 2, name: 'Electric Kettle', price: 4990, image: 'https://images.unsplash.com/photo-1594224457860-23f466bccbe9' },
      { id: 3, name: 'Coffee Maker', price: 18990, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd' },
      { id: 4, name: 'Food Processor', price: 15990, image: 'https://images.unsplash.com/photo-1590332762349-2b9d5ff35783' },
      { id: 5, name: 'Toaster Oven', price: 9990, image: 'https://images.unsplash.com/photo-1619723515871-3b5bf21a579d' },
      { id: 6, name: 'Dishwasher', price: 79990, image: 'https://images.unsplash.com/photo-1581622558663-b2e33377dfb2' },
    ]
  }
};

const CategoryPage = () => {
  const { category } = useParams();
  const [view, setView] = useState('grid');
  const [sortOption, setSortOption] = useState('featured');
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    // Capitalize first letter for display
    const formattedCategory = category.toLowerCase();
    setCurrentCategory(categoryData[formattedCategory] || null);
    
    // Scroll to top when category changes
    window.scrollTo(0, 0);
  }, [category]);

  if (!currentCategory) {
    return (
      <>
        <div className="min-h-[50vh] flex items-center justify-center">
          <h2 className="text-2xl text-gray-600">Category not found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      
      {/* Category Banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: `url(${currentCategory.bannerImage})`,
            filter: 'brightness(70%)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{currentCategory.title}</h1>
            <p className="md:text-lg max-w-xl">{currentCategory.description}</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <button className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded-md">
            <FiFilter size={18} />
            <span>Filter</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setView('grid')} 
                className={`p-2 rounded-md ${view === 'grid' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                <FiGrid />
              </button>
              <button 
                onClick={() => setView('list')} 
                className={`p-2 rounded-md ${view === 'list' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                <FiList />
              </button>
            </div>
            
            <div className="relative">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
        
        {/* Products Grid/List */}
        {view === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {currentCategory.products.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link to={`/product/tv`} className="block">
                  <div className="aspect-square bg-gray-100">
                    <img 
                      src={`${product.image}?w=400&fit=crop`} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                    <p className="font-bold text-primary">Rs. {product.price.toLocaleString()}</p>
                  </div>
                </Link>
                <div className="px-4 pb-4">
                  <button className="w-full bg-primary text-white py-2 rounded-md font-medium">
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {currentCategory.products.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-lg shadow-md overflow-hidden flex"
              >
                <div className="w-1/3 bg-gray-100">
                  <img 
                    src={`${product.image}?w=400&fit=crop`} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">Premium quality product with 1-year warranty</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-primary text-xl">Rs. {product.price.toLocaleString()}</p>
                    <button className="bg-primary text-white px-4 py-2 rounded-md font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </>
  );
};

export default CategoryPage;