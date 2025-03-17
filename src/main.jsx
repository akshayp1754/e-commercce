import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { ProductProvider } from "./context/product.jsx";
import { AuthProvider } from "./context/Auth.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AuthProvider>
  </BrowserRouter>
);
