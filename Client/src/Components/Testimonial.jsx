import React from "react";
import { assets, testimonialData } from "../assets/assets";
import { delay, motion } from "motion/react";

const Testimonial = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center py-12 my-24"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold">
        Customer Testimonials{" "}
      </h1>
      <p className="text-black dark:text-white mb-12">
        What our users are saying
      </p>
      <div className="flex flex-wrap gap-4">
        {testimonialData.map((testimonial, index) => (
          <div
            key={index}
            className="text-black dark:text-white p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all"
          >
            <motion.div
              whileHover={{ scale: 1.05, duration: 0.1 }}
              className="flex flex-col items-center"
            >
              <img
                src={testimonial.image}
                alt=""
                className="rounded-full w-14"
              />
              <h2 className="text-xl font-semibold mt-3">{testimonial.name}</h2>
              <p className="text-black dark:text-white mb-4">
                {testimonial.role}
              </p>
              <div className="flex mb-4">
                {Array(testimonial.stars)
                  .fill()
                  .map((item, index) => (
                    <img key={index} className="w-4" src={assets.star}></img>
                  ))}
              </div>
              <p className="text-center text-smtext-black dark:text-white ">
                {testimonial.text}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonial;
