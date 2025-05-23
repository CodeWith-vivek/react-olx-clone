import React from 'react'
import Home from "./Pages/Home";
import { Route, Routes } from 'react-router-dom'
import Details from "./Pages/Details";
import Footer from './Components/Footer/Footer'
import Footer2 from './Components/Footer/Footer2'
import Wishlist from "./Pages/Wishlist";
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
