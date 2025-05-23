import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell";
import Card from "../Components/Card/Card";
import { useWishlist } from "../Context/Wishlist";
import Nofav from "../assets/no-favorites.webp";
import { Link } from "react-router-dom";
import EmailLogin from "../Modal/EmailLogin";
import { useState } from "react";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const [openModal, setModal] = React.useState(false);
  const toggleModal = () => setModal(!openModal);
  const [openModalSell, setModalSell] = React.useState(false);
  const toggleModalSell = () => setModalSell(!openModalSell);

  const [openEmailModal, setOpenEmailModal] = useState(false);
  const toggleEmailModal = () => setOpenEmailModal(!openEmailModal);

  return (
    <div className="relative min-h-screen">
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      <Login
        toggleModal={toggleModal}
        status={openModal}
        openEmailModal={toggleEmailModal}
      />
      <EmailLogin toggleModal={toggleEmailModal} status={openEmailModal} />
      <Sell
        setItems={() => {}}
        toggleModalSell={toggleModalSell}
        status={openModalSell}
      />

      {wishlist.length === 0 ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <img src={Nofav} alt="Empty Wishlist" className="mx-auto" />
            <h1 className="text-xl text-gray-700 mt-4 font-bold">
              You haven't liked any ads yet
            </h1>
            <h2 className="text-xl text-gray-700 mt-4">Like ads and share</h2>
            <h2 className="text-xl text-gray-700 mt-0">them with the world</h2>
            <Link to="/">
              <div className="flex justify-center items-center mt-6">
                <button className="px-6 py-2 bg-white text-[#004896] border-2 border-[#004896] font-bold rounded-lg shadow-md hover:bg-[#004896] hover:text-white transition-colors">
                  Discover
                </button>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <Card items={wishlist} title="Wishlist" />
      )}
    </div>
  );
};

export default Wishlist;
