import React from "react";
import { assets } from "../assets/assets";
import { delay, motion } from "motion/react";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create Ai-Images
      </h1>
      <p className="text-black dark:text-white mb-8 ">
        Turn your imagination into visuals
      </p>

      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center ">
        <img
          src={assets.third_image}
          alt=""
          className="w-80 xl:w-96 cursor-pointer rounded-lg hover:scale-[1.02] transition-all duration-300"
        />
        <div>
          <h2>Introducing the Ai-Powred Text To Image Generator </h2>
          <p>
            A Text-to-Image Generator AI offers numerous advantages, making
            visual content creation more accessible and efficient. It eliminates
            the need for advanced artistic skills by transforming simple text
            prompts into high-quality images, saving time and effort. Designers,
            marketers, and content creators can quickly generate visuals
            tailored to their needs, enhancing creativity and productivity. This
            technology also e nables rapid prototyping for concept art, product
            design, and storytelling, helping businesses and individuals bring
            their ideas to life with minimal resources.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
