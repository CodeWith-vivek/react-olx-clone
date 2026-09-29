import React from 'react'
import Home from "@/pages/Home";
import { Route, Routes } from 'react-router-dom'
import Details from "@/pages/Details";
import Footer from "@/components/layout/Footer/Footer"
import Footer2 from "@/components/layout/Footer/Footer2"
import Wishlist from "@/pages/Wishlist";
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer />
      <Footer2 />
    </>
  );
}

export default App
