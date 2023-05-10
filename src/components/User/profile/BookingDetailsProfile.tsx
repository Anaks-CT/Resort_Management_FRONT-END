import React, { useState } from "react";
import BookingRoomDetailsProfile from "./BookingRoomDetailsProfile";
import Button from "../../UI/Button";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { IBookingDetail } from "../../../interface/booking.interface";
import { cancelBookingApi } from "../../../api/booking.api";
import { useSelector } from "react-redux";
import { IStore } from "../../../interface/slice.interface";

type props = {
  bookingDetail: IBookingDetail;
  setBookingDetails: React.Dispatch<
    React.SetStateAction<IBookingDetail[] | undefined>
  >;
};

function BookingDetailsProfile({ bookingDetail, setBookingDetails }: props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRoomDetails, setRoomDetails] = useState(false);
  const roomDetails = bookingDetail.roomDetail.map((item, i) => (
    <BookingRoomDetailsProfile
      roomDetail={item}
      roomNumber={i}
      key={item._id}
    />
  ));
  const userToken = useSelector((state: IStore) => state.userAuth.token);
  const cancelBooking = () => {
    setLoading(true);
    cancelBookingApi(userToken, bookingDetail._id)
      .then((res) => setBookingDetails(res.data.data))
      .catch((err) => setError(err?.response?.data?.message))
      .finally(() => setLoading(false));
  };
  return (
    <div className="p-3 text-black bg-white grid gap-2 rounded">
      <div className="text-center tracking-wide text-premium mb-2 font-black md:text-2xl uppercase">
        {bookingDetail.resortName}
      </div>

      <div className="grid gap-2 md:gap-0 md:divide-x md:flex justify-between text-xs pl-3 mx-auto md:mx-0">
        <div className="grid gap-2 md:w-2/5">
          <div className="flex  justify-between items-center">
            <div className="w-1/2">NAME</div>
            <div className="w-1/2 uppercase">: {bookingDetail.name}</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">CONTACT</div>
            <div className="w-1/2">: {bookingDetail.phone}</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">NO. OF ROOMS</div>
            <div className="w-1/2">: {bookingDetail.roomDetail.length}</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">BOOKING DATE</div>
            <div className="w-1/2 ">
              : {new Date(bookingDetail.BookingDate).toLocaleDateString()}
            </div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">BOOKING ID</div>
            <div className="w-1/2">: {bookingDetail._id.slice(-6)}</div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">CHECKIN DATE</div>
            <div className="w-1/2">
              : {new Date(bookingDetail.checkInDate).toLocaleDateString()}
            </div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2">CHECKOUT DATE</div>
            <div className="w-1/2">
              : {new Date(bookingDetail.checkOutDate).toLocaleDateString()}
            </div>
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
              <span className="text-base">: INR</span>{" "}
              {bookingDetail.amount.totalRoomCost}
            </div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2 md:w-2/3">APPLICABLE TAXES AND FEES</div>
            <div className="w-1/2 md:w-1/3 text-lg">
              <span className="text-base">: INR</span>{" "}
              {bookingDetail.amount.taxCost}
            </div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2 md:w-2/3">POINTS APPLIED</div>
            <div className="w-1/2 md:w-1/3 text-lg">
              : {bookingDetail.amount.pointsUsed}
            </div>
          </div>
          <div className="flex  justify-between items-center">
            <div className="w-1/2 md:w-2/3">TOTAL FEES FOR 1 DAYS(S)</div>
            <div className="w-1/2 md:w-1/3 text-xl">
              <span className="text-base">: INR</span>{" "}
              {bookingDetail.amount.totalCost}
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
      {showRoomDetails && (
        <div className="grid md:divide-x md:grid-cols-2">{roomDetails}</div>
      )}
      <div className="mx-auto">
        {loading && (
          <div className="flex justify-center">
            <img
              width={50}
              src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1680669482/Spinner-1s-200px_4_ontbds.gif"
              alt=""
            />
          </div>
        )}
        {bookingDetail.status ? (
          <Button class="px-3 py-1" color="danger" onClick={cancelBooking}>
            CANCEL
          </Button>
        ) : (
          <div className="rounded text-red-600 text-lg">Booking Cancelled</div>
        )}
      </div>
      <div className="text-center text-red-600">{error}</div>
      <div className="text-[13px] text-center font-black">
        Your money will be credited as points
      </div>
    </div>
  );
}

export default BookingDetailsProfile;
