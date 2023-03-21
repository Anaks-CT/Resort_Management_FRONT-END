import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
// import { motion } from 'framer-motion'

export function Header2() {
  const [menuToggler, setToggle] = useState(false);
  const [scrolldown, setscrolldown] = useState(false);
  const handleToggle = () => {
    setToggle(!menuToggler);
  };
  ////////////////////////////////////// togging the meny toggle according to window size//////////////////////////////////////

  useEffect(() => {
    window.innerWidth > 768 && setToggle(true);
    window.addEventListener("resize", () => {
      window.innerWidth < 768 ? setToggle(false) : setToggle(true);
      return () => {
        window.removeEventListener("resize", () => {});
      };
    });
  }, []); // doubt should there be a dependanct array

  ///////////////////////////////////// desappearing the first header when scrolling down by toggling the scrolldown state/////////

  var lastScrollTop = 0;
  useEffect(() => {
    window.addEventListener(
      "scroll",
      function () {
        var st = window.pageYOffset || document.documentElement.scrollTop;
        if (st > lastScrollTop) {
          // downscroll code
          setscrolldown(true);
        } else if (st < lastScrollTop) {
          // upscroll code
          setscrolldown(false);
        } // else was horizontal scroll
        lastScrollTop = st <= 0 ? 0 : st;
      },
      false
    );
    return () => {
      window.addEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <div
        id="mini_header"
        className={`${
          scrolldown && "invisible"
        } flex justify-end items-center py-1 px-12 mx-auto bg-[#2a2a2a] fixed w-screen z-20 top-0`}
      >
        <div className="w-96 flex justify-between items-center md:mr-10">
          {/* link tag */}{" "}
          <p className="text-white md:text-md text-[12px]">RETRIVE BOOKING</p>
          <div className="flex gap-3">
            <Link to={"/login"}>
              <p className="text-blue-200 md:text-md text-[12px]">LOGIN</p>
            </Link>
            <Link to={"/signup"}>
              <p className="text-blue-200 md:text-md text-[12px]">JOIN NOW</p>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`py-4 px-12 mx-auto bg-black fixed w-screen opacity-75 z-20 ${
          scrolldown ? "top-0" : "top-[26px]"
        }`}
      >
        <div className={`md:flex`}>
          <Link to={"/"} className="md:w-1/5">
            <div
              className={` ${
                menuToggler && `pb-12`
              } md:pb-0 items-center flex justify-start text-white text-xl md:text-3xl font-bold tracking-widest`}
            >
              TRINITY
            </div>
          </Link>
          {menuToggler && (
            <>
              <div
                className={`md:w-1/5 w-screen pb-5 md:pb-0 items-center flex justify-start md:justify-end text-white text-md md:text-lg tracking-wide`}
              >
                RESORTS
              </div>
              <div
                className={`md:w-1/5 w-screen pb-5 md:pb-0 items-center flex justify-start md:justify-center text-white text-md md:text-lg tracking-wide`}
              >
                <Link to={"/dining"}>
                  <p>DINING</p>
                </Link>
              </div>
              <div
                className={`md:w-1/5 w-screen pb-5 md:pb-0 items-center flex justify-start text-white text-md md:text-lg tracking-wide`}
              >
                <Link to={"/wellness"}>
                  <p>WELLNESS</p>
                </Link>
              </div>
            </>
          )}
          <div className="absolute top-3 right-20">
            <button className="text-white md:text-lg text-sm bg-premium p-2 rounded-lg">
              BOOKING
            </button>
          </div>
          <div className="md:invisible" onClick={handleToggle}>
            {" "}
            <AiOutlineMenu className="text-white absolute top-4 right-8 text-3xl md:right-5" />{" "}
          </div>
        </div>
      </div>
    </>
  );
}