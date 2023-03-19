import React from "react";

function CircleBanner() {
  return (
    <div className=" py-44 px-5 md:px-24">
      <div className="flex lg:flex-row flex-col justify-around items-center gap-7">
        <div className=" flex flex-col justify-center">
          <h2 className="text-white font-sans tracking-wide mb-5">
            WELCOME TO ISLAND RESORT
          </h2>
          <h1 className="text-white mb-10">Redefining luxury</h1>
          <h5 className="md:text-2xl text-lg text-white">
            We are leading luxury travel to something more 
            emotional and inspiring. With our World-Class 
            hospitality and bold creative flair, we create 
            moments that stay with our guests to years to 
            come.
          </h5>
        </div>
        <div className="flex justify-center">
            <div className="rounded-full bg-red-200 lg:w-[500px] lg:h-[500px] mt-10 md:mt-0 w-[350px] h-[350px] ">sdf</div>
        </div>
      </div>
    </div>
  );
}

export default CircleBanner;
