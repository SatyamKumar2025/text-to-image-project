import React from "react";
import Header from "../Components/Header";
import Steps from "../Components/Steps";
import Description from "../Components/Description";
import Testimonial from "../Components/Testimonial";
import GenrateButton from "../Components/GenrateButton";
const Home = () => {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Testimonial />
      <GenrateButton />
    </div>
  );
};

export default Home;
