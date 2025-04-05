import React, { useContext } from "react";
import { motion } from "motion/react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

function Header() {
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
      className="flex flex-col jystify-center text-center items-center my-20"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p>Best Text To Image Generator</p>
        <img src=".\src\assets\star.png" alt="" className="w-7"></img>
      </motion.div>
      <motion.h1
        className="text-8xl max-w-[800px] sm:text-9xl sm:max-w-[1100px] mx-auto mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
      >
        Turn text into <span className="text-cyan-500">image</span>, in seconds
      </motion.h1>
      <motion.p
        className="text-center max-w-4xl text-2xl mx-auto mt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Unleash Your Creativity with Ai. Turn your imagination into visual art
        in seconds - just type, and watch the magic happen.
      </motion.p>
      <motion.button
        onClick={onClickHandler}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full   "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          default: { duration: 0.5 },
          opacity: { delay: 0.8, duration: 1 },
        }}
      >
        Generate images
        <img src=".\src\assets\generate.png" className="w-7"></img>
      </motion.button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="flex flex-row gap-5 items-start pt-9"
      >
        <motion.img
          whileHover={{ scale: 1.05, duration: 0.1 }}
          src=".\src\assets\3rd.jpg"
          className="w-40 h-40 object-cover"
        />
        <motion.img
          whileHover={{ scale: 1.05, duration: 0.1 }}
          src=".\src\assets\2nd.jpg"
          className="w-40 h-40 object-cover"
        />
        <motion.img
          whileHover={{ scale: 1.05, duration: 0.1 }}
          src=".\src\assets\1st.png"
          className="w-40 h-40 object-cover"
        />
        <motion.img
          whileHover={{ scale: 1.05, duration: 0.1 }}
          src=".\src\assets\2nd.jpg"
          className="w-40 h-40 object-cover"
        />
        <motion.img
          whileHover={{ scale: 1.05, duration: 0.1 }}
          src=".\src\assets\3rd.jpg"
          className="w-40 h-40 object-cover"
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="pt-3 text-xl font-thin"
      >
        {" "}
        Your imaginary visuals{" "}
      </motion.p>
    </motion.div>
  );
}

export default Header;
