import React from "react";
import Button from "../../UI/Button";

type props ={
    url?: string
    heading?: string
    des?: string
    button1?: string
    button2?: string
}

function BackgroundBanner({url, heading, des, button1, button2}:props) {
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)), url(${url})`,
  };
  return (
    <div className="">
      <div
        className="w-100% h-screen bg-no-repeat bg-cover bg-center saturate-200 flex md:justify-start justify-center"
        style={style}
      >
        <div className="bg-gradient-to-t from-transparent to-black absolute w-full md:h-96 h-36"></div>
        <div className="bg-gradient-to-t from-transparent to-black absolute w-full md:h-96 h-36"></div>
        <div className="flex flex-col justify-center md:item items-start w-full md:w-[800px] px-10">
          <h1 className="mb-5 z-30 font-bold md:text-6xl text-4xl text-white">{heading}</h1>
          <h2 className=" md:text-2xl text-lg text-white">{des}</h2>
          <div className="flex gap-7">
            {button1 && <Button class="border-black px-7 mt-10" color="premium">{button1}</Button>}
            {button2 &&<Button class="border-black px-7 mt-10" color="premium">{button2}</Button>}
          </div>
        </div>
        <div className="bg-gradient-to-b from-transparent to-black absolute w-full bottom-0 h-64"></div>
      </div>
    </div>
  );
}

export default BackgroundBanner;
