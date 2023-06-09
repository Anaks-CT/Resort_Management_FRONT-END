import React, { useState } from "react";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

type props = {
  data: any;
  invert?: boolean;
};

function CircleBanner({ data, invert }: props) {
  // doubt how to give types or interface to the array im passing which has an interface of circlebanner
  const [carouselNumber, setcarouselNumber] = useState(0);


  const style = {
    backgroundImage: `url(${
      data && data.length>0 &&
      data[
        carouselNumber < data.length && carouselNumber > 0 ? carouselNumber : 0
      ]?.image
    })`,
  };

  //////////////////////////////// setting the carousel back to initail after reaching maximum and vice versa ///////////////////

  (carouselNumber === data?.length && data?.length > 0) && setcarouselNumber(0);
  carouselNumber === -1 && setcarouselNumber(data.length - 1);

  //////////////////////////////// next and previous carousel set up ////////////////////////

  const previousCarousel = () => {
    setcarouselNumber((prevdata) => prevdata - 1);
  };
  const nextCarousel = () => {
    setcarouselNumber((prevdata) => prevdata + 1);
  };

  //////////////////////////////// setting up the carousel to show if when inverted or not /////////////////////

  const carousel = (
    <div className="flex items-center">
      <HiChevronLeft
        className="text-white text-[17px] md:text-[27px]"
        onClick={previousCarousel}
      />
      <div
        className="rounded-full bg-red-200 lg:w-[470px] lg:h-[470px] mt-10 md:mt-0 w-[325px] h-[325px] bg-cover"
        style={style}
      ></div>
      <HiChevronRight
        className="text-white text-[17px] md:text-[27px]"
        onClick={nextCarousel}
      />
    </div>
  );

  return (
    <>
    {data && data.length>0 && (
      <div className=" py-44 px-5 md:px-24">
      <div className="flex lg:flex-row flex-col justify-around items-center gap-7">
        {invert && carousel}

        <div className=" flex flex-col justify-center">
          <h2 className="text-white font-sans tracking-wide mb-5">
            {data && data.length > 0 && (
              <div className="mini-heading">
                {data[
                  carouselNumber < data.length && carouselNumber > 0
                    ? carouselNumber
                    : 0
                ]?.miniHeading &&
                  data[
                    carouselNumber < data.length && carouselNumber > 0
                      ? carouselNumber
                      : 0
                  ].miniHeading.toUpperCase()}
              </div>
            )}
          </h2>
          <h1 className="text-white mb-10">
            {data &&  data.length > 0 &&
              data[
                carouselNumber < data.length && carouselNumber > 0
                  ? carouselNumber
                  : 0
              ].description1}
          </h1>
          <h5 className="md:text-2xl text-lg text-white">
            {data && data.length > 0 &&
              data[
                carouselNumber < data.length && carouselNumber > 0
                  ? carouselNumber
                  : 0
              ].description2}
          </h5>
        </div>

        {invert || carousel}
      </div>
    </div>
    )}
    </>
  );
}

export default CircleBanner;
