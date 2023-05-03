import React, { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

function BookingRoomDetailsProfile() {
  const [showRoomDetails, setRoomDetails] = useState(false);
  return (
    <>

        <div className="text-sm grid pl-3 gap-2 border py-5">
          <div className="font-black mb-2">ROOM 1</div>
          <div className="flex text-xs justify-between items-center">
            <div className="w-1/2 self-start">ROOM NAME</div>
            <div className="w-1/2">: DF SDF SOMETHING LIKE THIS </div>
          </div>
          <div className="flex text-xs justify-between items-center">
            <div className="w-1/2 self-start">ROOM NO.</div>
            <div className="w-1/2">: 45SD </div>
          </div>
          <div className="flex text-xs justify-between items-center">
            <div className="w-1/2 self-start">PACKAGE NAME</div>
            <div className="w-1/2">: DF LIKE THIS </div>
          </div>
          <div className="flex text-xs justify-between items-center">
            <div className="w-1/2">PACKAGE COST</div>
            <div className="w-1/2 text-base">
              <span className="text-xs">: INR</span> 45,546
            </div>
          </div>
        </div>
    </>
  );
}

export default BookingRoomDetailsProfile;
