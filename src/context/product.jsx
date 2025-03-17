import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext({
  products: [],
  loading: false,
  error: null,
  fetchProducts: () => {},
  fetchProductsByCategory: () => {},
  currentCategory: null,
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  cartCount: 0,
  cartTotal: 0
});

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on initial load
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error("Error loading cart from localStorage:", err);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      // Update cart count and total
      const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(itemCount);
      
      const total = cartItems.reduce((sum, item) => {
        const price = item.product.price;
        // Platzi API doesn't have discountPercentage, so we'll just use the price directly
        return sum + (price * item.quantity);
      }, 0);
      setCartTotal(total);
    } catch (err) {
      console.error("Error saving cart to localStorage:", err);
    }
  }, [cartItems]);

  const fetchProducts = async (retries = 3, delay = 1000) => {
    setLoading(true);
    setError(null);
    
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products?limit=20"
        );
        setProducts(response.data);
        setCurrentCategory(null);
        setLoading(false);
        return; // Success, exit the function
      } catch (err) {
        console.log(`Attempt ${attempt + 1} failed. Retrying...`);
        
        if (attempt === retries - 1) {
          // Last attempt failed
          setError("Failed to fetch products. Please check your network connection and try again.");
          setLoading(false);
          return;
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    setLoading(true);
    setError(null);
    try {
      // Ensure categoryId is a number
      const numericCategoryId = parseInt(categoryId, 10);
      
      if (isNaN(numericCategoryId)) {
        throw new Error("Invalid category ID");
      }
      
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products/?categoryId=${numericCategoryId}`);
      setProducts(response.data);
      
      // Get category name
      const categoryResponse = await axios.get(`https://api.escuelajs.co/api/v1/categories/${numericCategoryId}`);
      setCurrentCategory(categoryResponse.data.name);
    } catch (err) {
      setError(`Failed to fetch category products: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (productId) => {
    setLoading(true);
    setError(null);
    try {
      // Ensure productId is a number
      const numericProductId = parseInt(productId, 10);
      
      if (isNaN(numericProductId)) {
        throw new Error("Invalid product ID");
      }
      
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${numericProductId}/related`);
      return response.data;
    } catch (err) {
      setError("Failed to fetch related products.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getProductBySlug = async (slug) => {
    setLoading(true);
    setError(null);
    try {
      if (!slug || typeof slug !== 'string') {
        throw new Error("Invalid slug");
      }
      
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products/slug/${slug}`);
      return response.data;
    } catch (err) {
      setError("Failed to fetch product details.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product, quantity = 1, selectedColor = "Default", selectedSize = "M") => {
    setCartItems(prevItems => {
      // Check if product already exists in cart with same options
      const existingItemIndex = prevItems.findIndex(item => 
        item.product.id === product.id && 
        item.selectedColor === selectedColor && 
        item.selectedSize === selectedSize
      );
      
      if (existingItemIndex !== -1) {
        // Product exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Product doesn't exist in cart, add new item
        return [...prevItems, {
          id: Date.now(), // Generate unique ID for cart item
          product,
          quantity,
          selectedColor,
          selectedSize
        }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]); 
    localStorage.removeItem('cart');
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{ 
        products, 
        loading, 
        error, 
        fetchProducts,
        fetchProductsByCategory,
        fetchRelatedProducts,
        getProductBySlug,
        currentCategory,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        cartCount,
        cartTotal,
        clearCart
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};