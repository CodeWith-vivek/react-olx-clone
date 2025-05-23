import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar/Navbar";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell"
import Card from "../Components/Card/Card";
import { fetchFromFireStore } from "../config/Firebase/Firebase";
import { ItemsContext } from "../Context/item";
import Banner from "../Components/Banner/Banner";
import EmailLogin from "../Modal/EmailLogin";

const Home = () => {
  const [openModal, setModal] = useState(false);
  const toggleModal = () => setModal(!openModal);

  const [openModalSell, setModalSell] = useState(false);
  const toggleModalSell = () => setModalSell(!openModalSell);

  const [openEmailModal, setOpenEmailModal] = useState(false);
  const toggleEmailModal = () => setOpenEmailModal(!openEmailModal);

  const itemsCtx = ItemsContext();

  useEffect(() => {
    const getItems = async () => {
      const datas = await fetchFromFireStore();
      itemsCtx?.setItems(datas);
    };
    getItems();
  }, []);

  useEffect(() => {
    console.log("Updated Items", itemsCtx.items);
  }, [itemsCtx.items]);

  return (
    <div>
      <Navbar toggleModal={toggleModal} toggleModalSell={toggleModalSell} />
      <Banner />
      <Login
        toggleModal={toggleModal}
        status={openModal}
        openEmailModal={toggleEmailModal}
      />
      <EmailLogin toggleModal={toggleEmailModal} status={openEmailModal} />
      <Sell
        setItems={itemsCtx.setItems}
        toggleModalSell={toggleModalSell}
        status={openModalSell}
      />
      <Card items={itemsCtx.items || []} />
      <div className="flex justify-center items-center mb-6">
        <button className="px-6 py-2 bg-white text-[#004896] border-2 border-[#004896] font-bold rounded-lg shadow-md hover:bg-[#004896] hover:text-white transition-colors">
          Load more
        </button>
      </div>
    </div>
  );
};

export default Home
