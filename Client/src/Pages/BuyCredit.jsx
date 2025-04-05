import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const BuyCredit = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="min-h-[80vh] text-center pt-12 mb-10"
    >
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center tex-3xl font-medium mb-6 sm:mb-4">
        Choose The Plan
      </h1>
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            key={index}
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8
          text-gray-600 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.Logo} width={45}></img>
            <p className="mt-3 mb-1 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">{item.price} rs-/</span>
              {item.credits} credits
            </p>
            <button
              className="w-full bg-gray-800 text-white min-w-52 py-2.5 rounded-full mt-8 text-sm"
              onClick={() => navigate("/pay")}
            >
              {user ? "Purchase" : " Get Started"}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BuyCredit;
