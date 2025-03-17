// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuthStatus = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshTokenValue = localStorage.getItem('refreshToken');
      
      if (accessToken) {
        try {
          // Get user profile using the token
          const user = JSON.parse(localStorage.getItem('user'));
          setCurrentUser(user);
        } catch (error) {
          // If token is expired, try to refresh
          if (refreshTokenValue) {
            try {
              const tokens = await refreshToken(refreshTokenValue);
              localStorage.setItem('accessToken', tokens.access_token);
              localStorage.setItem('refreshToken', tokens.refresh_token);
              // You'd typically fetch user data here again
            } catch (refreshError) {
              logout();
            }
          } else {
            logout();
          }
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await loginUser(email, password);
      localStorage.setItem('accessToken', response.access_token);
      localStorage.setItem('refreshToken', response.refresh_token);
      
      // In a real app, you'd fetch user profile here
      // For now, we'll store basic info
      const user = { email };
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to login');
      return false;
    }
  };

  const register = async (name, email, password, avatar) => {
    setError(null);
    try {
      // First check if email is available
      const available = await checkEmailAvailability(email);
      if (!available) {
        setError('Email is already in use');
        return false;
      }
      
      // If email is available, register the user
      const user = await registerUser(name, email, password, avatar);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to register');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const resetError = () => setError(null);

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    resetError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};