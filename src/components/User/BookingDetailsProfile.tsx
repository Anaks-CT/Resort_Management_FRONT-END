import React, { useState } from "react";
import BookingRoomDetailsProfile from "./BookingRoomDetailsProfile";
import Button from "../UI/Button";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

function BookingDetailsProfile() {
  const [showRoomDetails, setRoomDetails] = useState(false);

  return (
    <div className="p-3 text-black bg-white grid gap-2 rounded ">
      <div className="text-center tracking-wide text-premium mb-2 font-black md:text-2xl">
        RESORT NAME
      </div>

      <div className="grid gap-2 md:gap-0 md:divide-x md:flex justify-between text-xs pl-3 mx-auto md:mx-0">
        <div className="grid gap-2 md:w-2/5">
          <div className="flex  justify-between items-center">
            <div className="w-1/2">NAME</div>
            <div className="w-1/2">: ANAKS CT</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">CONTACT</div>
            <div className="w-1/2">: 4567891234</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">NO. OF ROOMS</div>
            <div className="w-1/2">: 6</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">BOOKING DATE</div>
            <div className="w-1/2">: 19 / JAN / 2023</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">BOOKING ID</div>
            <div className="w-1/2">: b639b7</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">CHECKIN DATE</div>
            <div className="w-1/2">: 19 / JAN / 2023</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">CHECKOUT DATE</div>
            <div className="w-1/2">: 19 / JAN / 2023</div>
          </div>
        </div>
        <div className="grid gap-[6px] md:gap-0 md:w-3/5 self-start lg:pl-20 md:pl-5">
          <div className="text-center text-premium text-sm mb-7 hidden md:block">
            AMOUNT DETAILS
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2 md:w-2/3">
              ROOM COST EXCLUDING TAXES & FEES
            </div>
            <div className="w-1/2 md:w-1/3 text-lg">
              <span className="">: INR</span> 45,546
            </div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2 md:w-2/3">APPLICABLE TAXES AND FEES</div>
            <div className="w-1/2 md:w-1/3 text-lg">
              <span className="">: INR</span> 45,546
            </div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2 md:w-2/3">POINTS APPLIED</div>
            <div className="w-1/2 md:w-1/3 text-lg">: 0</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2 md:w-2/3">TOTAL FEES FOR 1 DAYS(S)</div>
            <div className="w-1/2 md:w-1/3 text-xl">
              <span className="text-base">: INR</span> 22,000
            </div>
          </div>
        </div>
      </div>
      <div
        className="mx-auto flex items-center gap-1 text-sm text-premium my-3 cursor-pointer"
        onClick={() => setRoomDetails(!showRoomDetails)}
      >
        SHOW ROOM DETAILS
        {showRoomDetails ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </div>
      {showRoomDetails && <div className="grid md:divide-x md:grid-cols-2">
        <BookingRoomDetailsProfile />
        <BookingRoomDetailsProfile />
        <BookingRoomDetailsProfile />
      </div>}
      <div className="mx-auto">
        <Button class="px-3 py-1" color="danger">
          CANCEL
        </Button>
      </div>
      <div className="text-[13px] text-center font-black">
        *No Refund will be provided
      </div>
    </div>
  );
}

export default BookingDetailsProfile;
