import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setSubscribed(true);
      setEmail('');
      // In a real app, you would send this to your backend
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 ">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">ShopEase</h2>
            <p className="text-gray-400 text-sm">
              Your one-stop destination for quality products at affordable prices.
              We've been serving customers since 2010 with pride and dedication.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sale Items</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Collections</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for exclusive deals, new arrivals, and more.
            </p>
            {subscribed ? (
              <div className="text-green-400 mb-4">
                Thanks for subscribing! Check your inbox soon.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex mb-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="bg-gray-800 text-white w-full pl-10 pr-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            <p className="text-gray-400 text-xs">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;