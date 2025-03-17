import React, { useEffect, useRef, useState } from "react";
import { useProduct } from "../context/product";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function ProductGrid() {
  const { products, loading, error, fetchProducts, fetchProductsByCategory, currentCategory } = useProduct();
  const location = useLocation();
  const initialFetchDone = useRef(false);
  const [categories, setCategories] = useState([]);
  
  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
        setCategories(response.data);
        console.log(response.data);
        
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    
    getCategories();
  }, []);
  
  useEffect(() => {
    const categoryName = location.state?.category;
    
    if (
      !initialFetchDone.current || 
      (categoryName && categoryName !== currentCategory) || 
      (!categoryName && currentCategory !== null)
    ) {
      if (categoryName) {
        // Find category ID from name without converting to lowercase
        const category = categories.find(cat => cat.name === categoryName);
    
        if (category) {
          fetchProductsByCategory(category.id);
        } else {
          if (categories.length > 0) {
            console.error("Category not found:", categoryName);
          }
        }
      
    
      } else {
        fetchProducts();
      }
      
      initialFetchDone.current = true;
    }
  }, [location.state?.category, currentCategory, categories]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-red-600">
          Error loading products: {error}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">No products found in this category.</div>
      </div>
    );
  }

  // Get category title
  const getCategoryTitle = () => {
    if (!currentCategory) return "Our Products";
    return currentCategory;
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {getCategoryTitle()}
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Link to={`/productDetails/${product.id}`} className="block">
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-auto lg:h-80">
                  <img
                    src={product.images?.[0] || product.category?.image}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </Link>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/productDetails/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}