import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMonitor,
  FiSmartphone,
  FiHome,
  FiWind,
  FiCoffee,
  FiCamera,
  FiHeadphones,
  FiWatch,
  FiSun,
  FiBook,
  FiLayers,
  FiGift,
} from "react-icons/fi";

const categories = [
  {
    name: "TVs & Audio",
    icon: <FiMonitor size={24} />,
    color: "bg-blue-500",
    link: "/category/electronics",
  },
  {
    name: "Phones",
    icon: <FiSmartphone size={24} />,
    color: "bg-yellow-500",
    link: "/category/electronics",
  },
  {
    name: "Furniture",
    icon: <FiHome size={24} />,
    color: "bg-red-500",
    link: "/category/furniture",
  },
  {
    name: "Cooling",
    icon: <FiWind size={24} />,
    color: "bg-blue-600",
    link: "/category/cooling",
  },
  {
    name: "Kitchen",
    icon: <FiCoffee size={24} />,
    color: "bg-yellow-600",
    link: "/category/kitchen",
  },
  {
    name: "Cameras",
    icon: <FiCamera size={24} />,
    color: "bg-red-600",
    link: "/category/electronics",
  },
  {
    name: "Audio",
    icon: <FiHeadphones size={24} />,
    color: "bg-blue-400",
    link: "/category/electronics",
  },
  {
    name: "Wearables",
    icon: <FiWatch size={24} />,
    color: "bg-yellow-400",
    link: "/category/electronics",
  },
  {
    name: "Lighting",
    icon: <FiSun size={24} />,
    color: "bg-red-400",
    link: "/category/furniture",
  },
  {
    name: "Office",
    icon: <FiBook size={24} />,
    color: "bg-blue-300",
    link: "/category/furniture",
  },
  {
    name: "Decor",
    icon: <FiLayers size={24} />,
    color: "bg-yellow-300",
    link: "/category/furniture",
  },
  {
    name: "Gifts",
    icon: <FiGift size={24} />,
    color: "bg-red-300",
    link: "/category/appliances",
  },
];

const CategoryItem = ({ category, index }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ delay: index * 0.05, duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="cursor-pointer"
  >
    <Link to={category.link} className="flex flex-col items-center">
      <div
        className={`${category.color} p-4 rounded-full text-white mb-2 shadow-md transition-transform duration-300 transform hover:scale-110 cursor-pointer`}
      >
        {category.icon}
      </div>
      <span className="text-sm font-medium">{category.name}</span>
    </Link>
  </motion.div>
);

const CategorySection = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <motion.div whileHover={{ x: 5 }} className="cursor-pointer">
            <Link to="/categories" className="text-primary font-medium text-sm">
              View All Categories
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-6">
          {categories.map((category, index) => (
            <CategoryItem
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
