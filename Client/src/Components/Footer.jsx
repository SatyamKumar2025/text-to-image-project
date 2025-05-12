import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20">
      <img src={assets.Logo} width={120}></img>
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-black dark:text-white max-sm:hidden">
        Copyright @Satyamkumar | All Right Reserved.
      </p>
      <div className="flex gap-2.5">
        <a href="https://www.facebook.com/share/1ATZy5MSQc/">
          <img src={assets.facebook_icon} width={35} />{" "}
        </a>
        <a href="https://www.linkedin.com/in/satyam-kumar-529a65265/">
          <img src={assets.linkedin_icon} width={35} />
        </a>
        <a href="">
          <img src={assets.instagram_icon} width={35} href="" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
