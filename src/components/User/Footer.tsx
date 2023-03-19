import React from "react";
import {FaTelegram, FaInstagramSquare} from 'react-icons/fa'
import { BsFacebook } from 'react-icons/bs'
import {IoLogoTwitter} from 'react-icons/io'

function Footer() {
  return (
    <div className="mx-auto sm:px-28 pt-28 pb-10 bg-[#1E1E1E]">
      <div className="sm:flex w-full mb-10 md:mb-28 lg:px-36">
        <div className="flex-col gap-5 md:w-1/2 flex">
          <h2 className=" md:text-lg text-sm text-white sm:text-start text-center">ABOUT US</h2>
          <h2 className=" md:text-lg text-sm text-white sm:text-start text-center">FAQS</h2>
          <h2 className=" md:text-lg text-sm text-white sm:text-start text-center">PRIVACY POLICY</h2>
          <h2 className=" md:text-lg text-sm text-white sm:text-start text-center">TERMS AND CONDITION</h2>
          <h2 className=" md:text-lg text-sm text-white sm:text-start text-center">CONTACT US</h2>
        </div>
        <div className="flex justify-center items-center w-full md:w-1/2 mt-10">
            <FaTelegram className="w-5 h-5 mx-2" />
            <FaInstagramSquare className="w-5 h-5 mx-2" />
            <BsFacebook className="w-5 h-5 mx-2" />
            <IoLogoTwitter className="w-5 h-5 mx-2" />
        </div>
      </div>
      <div className="w-full">
      <p className="text-white text-center text-sm font-sans">© COPYRIGHT TRINITY INTERNATIONAL LLC 2023</p>
      </div>
    </div>
  );
}

export default Footer;
