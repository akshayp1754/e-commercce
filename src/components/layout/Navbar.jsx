import React, { useState } from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router';
import { useProduct } from '../../context/product';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3); // Example cart count

  const { cartCount} = useProduct()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-indigo-600">ShopEase</h1>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link to={'/'} className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Home</Link>
            <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Products</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Categories</a>
            <a href="#" className="text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Deals</a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search size={16} />
              </div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-indigo-600">
              <User size={20} />
            </a>
            <Link to={'/cart'} className="text-gray-700 hover:text-indigo-600 relative">
              <ShoppingCart size={20} />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Mobile menu button */}
            <button onClick={toggleMenu} className="md:hidden flex items-center">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Home</a>
            <a href="#" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Products</a>
            <a href="#" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Categories</a>
            <a href="#" className="block text-gray-700 hover:text-indigo-600 px-3 py-2 font-medium">Deals</a>
          </div>
          {/* Search Bar - Mobile */}
          <div className="px-2 pb-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search size={16} />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;