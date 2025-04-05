import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setShowLogin, logout, credit } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between py-4 ">
      <Link to={"/"}>
        <img
          src="./src/assets/Logo.png"
          className="w-24 sm:w-32 lg:w-40 hover:scale-105 transition-all duration-700"
        ></img>
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img
                src="./src/assets/credit-star.png"
                className="w-10 drop-shadow-sm hover:scale-105 transition-all duration-700"
              ></img>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credit left : {credit}
              </p>
            </button>
            <p className="text-xl sm:text-sm max-sm:hidden pl-4 text-gray-600">
              Hii, {user.name}
            </p>
            <div className="relative group">
              <img
                className="w-10 drop-shadow"
                src="./src/assets/user.png"
                alt=""
              />
              <div className="absolute hidden group-hover:block top-0 right-0 left-0.4 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li
                    className="px-2 py-1 cursor-pointer pr-10"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5 text-2xl">
            <p
              className="cursor-pointer"
              onClick={() => {
                navigate("/buy");
              }}
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLogin((prev) => !prev)}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
