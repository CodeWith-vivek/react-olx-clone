import React from "react";

import Favorite from "../../assets/favorite.svg";
import FavoriteFilled from "../../assets/heart.png";
import { Link } from "react-router-dom";
import { useWishlist } from "../../Context/Wishlist";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/Firebase/Firebase";
import { toast } from "react-toastify";

const Card = ({ items, title }) => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [user] = useAuthState(auth);

  return (
    <div className="p-10 px-5 sm:px-15 md:px-30 lg:px-40 min-h-screen">
      <h1 style={{ color: "#002f34" }} className="text-2xl">
        {title || "Fresh Recommendations"}
      </h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-5">
        {items.map((item) => {
          const wishlisted = isWishlisted(item.id);

          return (
            <div
              key={item.id}
              style={{ borderWidth: "1px", borderColor: "lightgray" }}
              className="relative w-full h-72 rounded-md border-solid bg-gray-50 overflow-hidden cursor-pointer"
            >
              <Link
                to={"/details"}
                state={{ item }}
                style={{ display: "block", height: "100%" }}
              >
                <div className="w-full flex justify-center p-2 overflow-hidden">
                  <img
                    className="h-36 object-contain"
                    src={item.imageUrl || "https://via.placeholder.com/150"}
                    alt={item.title}
                  />
                </div>

                <div className="details p-1 pl-4 pr-4">
                  <h1
                    style={{ color: "#002f34" }}
                    className="font-bold text-xl"
                  >
                    ₹ {item.price}
                  </h1>
                  <p className="text-sm pt-2">{item.category}</p>
                  <p className="pt-2">{item.title}</p>
                </div>
              </Link>

              <div
                className="absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer z-10"
                onClick={(e) => {
                  e.preventDefault();
                  if (!user) {
                    toast.error("Please login to use wishlist.");
                    return;
                  }
                  toggleWishlist(item);
                }}
              >
                <img
                  className="w-5"
                  src={wishlisted ? FavoriteFilled : Favorite}
                  alt="Wishlist"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
