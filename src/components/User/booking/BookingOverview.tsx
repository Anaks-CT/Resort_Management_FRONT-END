import React from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import { IBookingForm1 } from "../../../interface/booking.interface";
import { getDateInRange } from "../../../helpers/getDatesInRange";

type props = {
  viewOverView: boolean;
  toggleOverview: () => void;
  form1Values: IBookingForm1;
  toggleViewRate: boolean;
  handleViewRateToggle: () => void;
  bookingOverViewRoomDetails: any[];
  setRoomListArrayNumber: React.Dispatch<React.SetStateAction<number>>
  setBookingOverViewRoomDetails: React.Dispatch<React.SetStateAction<any[]>>
  setToggleViewRate:  React.Dispatch<React.SetStateAction<boolean>>
};

function BookingOverview({
  viewOverView,
  toggleOverview,
  form1Values,
  toggleViewRate,
  handleViewRateToggle,
  bookingOverViewRoomDetails,
  setRoomListArrayNumber,
  setBookingOverViewRoomDetails,
  setToggleViewRate
}: props) {

  const navigate = useNavigate();
  const totalRooms = form1Values?.roomDetail.length;
  const totalGuests = form1Values?.roomDetail.reduce(
    (acc, cur) => (acc += +cur),
    0
  );

  const datesInRange = getDateInRange(
    form1Values?.date.startDate as any,
    form1Values?.date.endDate as any
  );

  
  const handleEditSelectedRoom = () => {
    // initializing the room selection

    // roomlist 1 details
    setRoomListArrayNumber(0)
    // initializing the booking overview with empty array
    setBookingOverViewRoomDetails([])
    // toggling the showrates button to false if the user clicked edit room when showing the rates of the rooom
    setToggleViewRate(false)
  }

  // rendering the selected room details in the overview 
  const selectedRoomDetails = bookingOverViewRoomDetails?.map((item, i) => (
    <div key={item} className="text-xs border-b tracking-wide p-2  lg:py-5  font-sans flex justify-between">
      <div className="font-black lg:font-medium flex md:gap-3 flex-col">
        <span>{item.roomName.toUpperCase()}</span>
        <span>{item.packageName.toUpperCase()}</span>
        <span>COST - {item.packageCost.toLocaleString('en-IN')} INR</span>
      </div>
    </div>
  ));

  return (
    <div className="px-7 py-3 overflow-y-auto fixed top-0 lg:max-w-xs lg:h-screen right-0 pt-8 text-white lg:opacity-90 bg-[#323232] border border-r-0 border-b-0 border-l-0 border-t-white w-screen ">
      <div className="flex justify-between lg:hidden ">
        <div
          onClick={
            toggleViewRate
              ? () => handleViewRateToggle()
              : () => navigate("/booking/explore")
          }
          className={`flex cursor-pointer justify-center items-center`}
        >
          <HiArrowLongLeft className=" text-2xl" />
          <span className="text-md ml-3">
            {toggleViewRate ? "Rooms" : "Back"}
          </span>
        </div>
        <div
          onClick={toggleOverview}
          className="flex cursor-pointer justify-center items-center"
        >
          <span className="text-md mr-3">Booking Overview</span>
          {viewOverView ? (
            <AiOutlineCaretUp className=" text-lg" />
          ) : (
            <AiOutlineCaretDown className=" text-lg" />
          )}
        </div>
      </div>
      <>
        <div
          className={`px-2 py-6 text-2xl tracking-wide ${
            !viewOverView && "hidden"
          } ${viewOverView ? "lg:block" : "lg:block"}`}
        >
          Your Stay
        </div>
        <div
          className={`flex flex-col P-1 my-auto divide-y ${
            !viewOverView && "hidden"
          } ${viewOverView ? "lg:block" : "lg:block"}`}
        >
          <div className="text-xs tracking-wide border-t p-2  lg:py-5  font-sans flex justify-between">
            <div className="font-black lg:font-medium">
              {form1Values?.destination.name.toUpperCase()}
            </div>
            <Link className="text-blue-400" to={"/booking/explore"}>
              EDIT
            </Link>
          </div>
          <div className="text-xs tracking-wide p-2 font-sans lg:py-5   flex justify-between">
            <div className="font-black lg:font-medium">
              {totalRooms} ROOM(S) - {totalGuests} GUESTS(S)
            </div>
            <Link className="text-blue-400" to={"/booking/explore"}>
              EDIT
            </Link>
          </div>
          <div className="text-xs border-b tracking-wide p-2  lg:py-5  font-sans flex justify-between">
            <div className="font-black lg:font-medium flex md:gap-3 flex-col">
              <span>{datesInRange.length} DAY(S)</span>
              <span>
                {form1Values?.date.startDate.toLocaleDateString()} -{" "}
                {form1Values?.date.endDate.toLocaleDateString()}
              </span>
            </div>
            <Link className="text-blue-400" to={"/booking/explore"}>
              EDIT
            </Link>
          </div>
          {selectedRoomDetails}
          {bookingOverViewRoomDetails.length !== 0 && <div onClick={handleEditSelectedRoom} className="text-blue-400 text-center p-3 cursor-pointer">EDIT ROOM</div>}
          <div className="w-full">
            <Button
              class="w-full mt-5 lg:mt-8 mb-2 text-sm"
              color="transparent"
              outline
            >
              SAVE FOR LATER
            </Button>
          </div>
        </div>
        <div
          className={`text-[11px] lg:text-[14px] leading-tight ${
            !viewOverView && "hidden"
          } ${viewOverView ? "lg:block" : "lg:block"}`}
        >
          {" "}
          Rates and availability can not be guaranteed at the time of
          confirmation.
        </div>
      </>
    </div>
  );
}

export default BookingOverview;
