import React, { useState } from "react";
import { BsDiamond } from "react-icons/bs";

type props = {
  highlights: string[];
  amenities: string[];
  facilities: string[];
};

function RoomDetails({ highlights, amenities, facilities }: props) {
  const [toggleDetail, setToggleDetail] = useState<1 | 2 | 3>(1);
  let points;
  if (toggleDetail === 1) {
    points = highlights;
  } else if (toggleDetail === 2) {
    points = amenities;
  } else if (toggleDetail === 3) {
    points = facilities;
  }
  const pointDetails = points?.map((item) => (
    <div className="flex md:grid-flow-col gap-3">
      <div>
        <BsDiamond />
      </div>
      <div>{item}</div>
    </div>
  ));

  console.log(highlights);
  return (
    <>
      <div className="flex text-xs justify-between mb-6">
        <span
          onClick={() => setToggleDetail(1)}
          className={`font-sans cursor-pointer text-premium ${
            toggleDetail === 1 && "underline"
          }`}
        >
          HIGHLIGHTS
        </span>
        <span
          onClick={() => setToggleDetail(2)}
          className={`font-sans cursor-pointer text-premium ${
            toggleDetail === 2 && "underline"
          }`}
        >
          AMENITIES
        </span>
        <span
          onClick={() => setToggleDetail(3)}
          className={`font-sans cursor-pointer text-premium ${
            toggleDetail === 3 && "underline"
          }`}
        >
          FACILITIES
        </span>
      </div>
      <div className="text-xs md:grid grid-cols-2 gap-3">
       {pointDetails}
      </div>
    </>
  );
}

export default RoomDetails;
