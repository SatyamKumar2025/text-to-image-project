import React from "react";
import { assets } from "../assets/assets";
import { delay, motion } from "motion/react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const GenrateButton = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-700 py-6 md:py-16 ">
        See The Magic. Try Now
      </h1>
      <motion.button
        onClick={onClickHandler}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
        className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white  
      m-auto hover:scale-1 transition-all duration-500"
      >
        {" "}
        Generate Images
        <img src=".\src\assets\generate.png" className="w-7"></img>
      </motion.button>
    </motion.div>
  );
};

export default GenrateButton;
