import React from 'react'
import { useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import HomePage from './components/HomePage'
import { Route, Router, Routes } from "react-router-dom";
import ProductDetails from './components/ProductDetails'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import OrderSuccess from './components/OrderSuccess'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'

function App() {

  return (
    <>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path='/productDetails/:id' element={ <ProductDetails/>}/>
      <Route path='/productGrid' element={ <ProductGrid/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/order-success/:id' element={<OrderSuccess/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>


    </Route>
  </Routes>
</>

  )
}

export default App
