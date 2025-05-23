import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ItemsContext } from "../Context/item";
import Navbar from "../Components/Navbar/Navbar";
import Login from "../Modal/Login";
import Sell from "../Modal/Sell";
import EmailLogin from "../Modal/EmailLogin";
import { userAuth } from "../Context/Auth";

const Details = () => {
  const location = useLocation();
  const { item: initialItem } = location.state || {};
  const [item, setItem] = useState(initialItem);

  const [openModal, setModal] = useState(false);
  const [openModalSell, setModalSell] = useState(false);
  const [openEmailModal, setOpenEmailModal] = useState(false);

  const toggleEmailModal = () => setOpenEmailModal(!openEmailModal);
  const toggleModal = () => setModal(!openModal);
  const toggleModalSell = () => setModalSell(!openModalSell);

  const [editItem, setEditItem] = useState(null);
  const auth = userAuth();
  const itemsCtx = ItemsContext();

 
  useEffect(() => {
    if (item && itemsCtx.items) {
      const updatedItem = itemsCtx.items.find((i) => i.id === item.id);
      if (updatedItem) {
        setItem(updatedItem);
      }
    }
  }, [itemsCtx.items, item]);

  const openEditModal = () => {
    setEditItem(item);
    toggleModalSell();
  };

  const handleItemUpdate = (updatedItem) => {
    setItem(updatedItem);
    toggleModalSell();
  };

  return (
    <div>
      <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
      <Login
        toggleModal={toggleModal}
        status={openModal}
        openEmailModal={toggleEmailModal}
      />
      <EmailLogin toggleModal={toggleEmailModal} status={openEmailModal} />

      <div className="grid gap-0 sm:gap-5 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 p-10 px-5 sm:px-15 md:px-30 lg:px-40">
        <div className="border-2 w-full rounded-lg flex justify-center overflow-hidden h-96">
          <img
            className="object-cover"
            src={item?.imageUrl}
            alt={item?.title}
          />
        </div>
        <div className="flex flex-col relative w-full">
          <p className="p-1 pl-0 text-2xl font-bold">₹ {item?.price}</p>
          <p className="p-1 pl-0 text-base">{item?.category}</p>
          <p className="p-1 pl-0 text-xl font-bold">{item?.title}</p>
          <p className="p-1 pl-0 sm:pb-0 break-words text-ellipsis overflow-hidden w-full">
            {item?.description}
          </p>
          <div className="w-full relative sm:relative md:absolute bottom-0 flex justify-between">
            <p className="p-1 pl-0 font-bold">Seller: {item?.userName}</p>
            <p className="p-1 pl-0 text-sm">{item?.createdAt}</p>
          </div>
          {auth?.user?.uid === item?.userId && (
            <button
              className="mt-4 px-6 py-2 bg-white text-[#004896] border-2 border-[#004896] font-bold rounded-lg shadow-md hover:bg-[#004896] hover:text-white transition-colors"
              onClick={openEditModal}
            >
              Edit Item
            </button>
          )}
        </div>
      </div>

      <Sell
        setItems={itemsCtx.setItems}
        toggleModalSell={toggleModalSell}
        status={openModalSell}
        editItem={editItem}
        setItem={handleItemUpdate}
      />
    </div>
  );
};

export default Details;
