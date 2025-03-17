import React from 'react';
import { ArrowRight, Star, ShoppingCart, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../context/product';

const HomePage = () => {
  const navigate = useNavigate();
  const { fetchProductsByCategory } = useProduct();
  
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 199.99,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      discount: 15,
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Organic Cotton T-Shirt',
      price: 34.99,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/11021985/pexels-photo-11021985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Clothes'
    },
    {
      id: 3,
      name: 'Stainless Steel Water Bottle',
      price: 24.99,
      rating: 4.7,
      image: 'https://rukminim2.flixcart.com/image/612/612/knj7wcw0/bottle/v/4/7/1000-thermosteel-1-fg-tms-fis-0062-milton-original-imag276hgtk7scwj.jpeg?q=70',
      discount: 10,
      category: 'Furniture'
    },
    {
      id: 4,
      name: 'Smart Fitness Tracker',
      price: 89.99,
      rating: 4.6,
      image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/g/i/i/46-t800-ultra-android-ios-maxphony-yes-original-imahyvrmqttzzghn.jpeg?q=70',
      category: 'sports-accessories'
    }
  ];

  const categories = [
    { id: 1, name: 'Electronics', displayName: 'Electronics', imageUrl: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=600', itemCount: 243 },
    { id: 2, name: 'Clothess', displayName: 'men\'s Fashion', imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600', itemCount: 521 },
    { id: 3, name: 'Furniture', displayName: 'Home & Decor', imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600', itemCount: 329 },
    { id: 4, name: 'skin-care', displayName: 'Beauty', imageUrl: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=600', itemCount: 198 },
    { id: 5, name: 'sports-accessories', displayName: 'Sports & Outdoors', imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/033/110/585/small/collage-of-diverse-sports-equipment-promoting-fitness-and-recreational-games-for-social-media-post-size-ai-generated-free-photo.jpg', itemCount: 176 }
  ];

  // Handle category navigation
const handleCategoryClick = (category) => {
  navigate('/productGrid', { state: { category } });
};

  const handleFeaturedProductClick = (category) => {
    fetchProductsByCategory(category);
    navigate('/productGrid');
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-indigo-700 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Spring Collection 2025</h1>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Discover our latest arrivals with up to 40% off. Limited time offers on premium selections.
          </p>
          <div className="flex space-x-4">
            <button 
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-md flex items-center transition-colors"
              onClick={() => navigate('/productGrid')}
            >
              Shop Now <ArrowRight className="ml-2" size={16} />
            </button>
            <button className="bg-transparent border border-white hover:bg-white hover:text-indigo-900 text-white font-medium py-3 px-6 rounded-md transition-colors">
              View Collections
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <a 
            href="#" 
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
            onClick={(e) => {
              e.preventDefault();
              navigate('/productGrid');
            }}
          >
            View All <ChevronRight size={16} className="ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleFeaturedProductClick(product.category)}
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-gray-100 bg-opacity-80 text-gray-800 text-xs px-2 py-1 rounded">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                        className={i < Math.floor(product.rating) ? "" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  <button className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="group relative rounded-lg overflow-hidden bg-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCategoryClick(category.name)}
              >
              <img
                  src={category.imageUrl}
                  alt={category.displayName}
                  className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="font-medium">{category.displayName}</h3>
                  <p className="text-xs opacity-80">{category.itemCount} products</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 rounded-full bg-purple-200 text-purple-800 text-sm font-semibold mb-4">
                Special Offer
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Save 20% on your first order!
              </h2>
              <p className="text-purple-100 mb-6">
                Sign up for our newsletter and get an exclusive discount code instantly.
                Plus, enjoy free shipping on orders over $50.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button className="bg-white text-purple-700 hover:bg-purple-50 font-medium px-6 py-3 rounded-md transition-colors whitespace-nowrap">
                  Get Discount
                </button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img
                src="/api/placeholder/600/400"
                alt="Promotional image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;