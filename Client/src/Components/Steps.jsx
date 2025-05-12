import React from "react";
import { StepData } from "../assets/assets";
import { motion } from "motion/react";

function Steps() {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-32 "
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        {" "}
        How It Works{" "}
      </h1>
      <p className="text-lg text-black dark:text-white mb-8">
        {" "}
        Transform words into Stunning image
      </p>
      <div className="space-y-4 w-full max-w-3xl text-sm">
        {StepData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-5 px-8 text-black dark:text-white
          shadow-md border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg"
          >
            <img src={item.icon} alt="" className="w-10 " />
            <div>
              <h2 className="text-xl font-medium">{item.title}</h2>
              <p className="text-black dark:text-white">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Steps;
