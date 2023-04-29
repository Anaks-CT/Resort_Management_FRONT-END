import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MiniHeader from "../../components/User/Header/MiniHeader";
import BookingProgress from "../../components/User/BookingProgress";
import BookingOverview from "../../components/User/booking/BookingOverview";
import SingleRoom from "../../components/User/room/SingleRoom";
import Button from "../../components/UI/Button";
import RoomPackage from "../../components/User/room/RoomPackage";
import { HiArrowLongLeft } from "react-icons/hi2";
import { IBookingForm1 } from "../../interface/booking.interface";
import BookingDetails from "../../components/User/booking/BookingDetails";

function BookingStayPage() {

  // navigating the page to booking/explore if anyone tries to access this page and there is not Booking form 1 details
  useEffect(() => {
    if(!availableRoomTypes || !form1){
      navigate('/booking/explore')
    }
  })

  // toggle state for OverView
  const [viewOverView, setViewOverView] = useState(false);

  const navigate = useNavigate();

  // accessing the formDetails from the booking explore page
  const location = useLocation();
  const availableRoomTypes = location?.state?.data;
  const form1: IBookingForm1 = location?.state?.bookingForm1;

 

  // state for storing the current package details from the room
  const [currentRoomPackageDetails, setCurrentRoomDetails] =
    useState<any>(null);

  // state for toggle the div to show the Rates of the selected room
  const [toggleViewRate, setToggleViewRate] = useState(false);
  //function for toggling the viewRates of selected room
  const handleViewRateToggle = () => {
    setToggleViewRate(!toggleViewRate);
  };

  // state for accessing the array of rooms list coming from the booking/explore page
  const [roomListArrayNumber, setRoomListArrayNumber] = useState<number>(0);

  // style for background image
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.3)), url(https://res.cloudinary.com/dhcvbjebj/image/upload/v1682333333/pexels-asad-photo-maldives-1268871_crcnzg.jpg)`,
  };

  // funtion for toggling the OvewView in mobile view
  const toggleOverview = () => setViewOverView(!viewOverView);

  // pushing the room list with the selected room occupancy according to the order user filled booking form 1 details
  const roomList: any = [];
  form1?.roomDetail?.forEach((item: any) => {
    availableRoomTypes.forEach((roomType: any) => {
      if (item === roomType[0].maxPeople || item === roomType[0].maxPeople+1 ) {
        roomList.push(roomType);
      }
    });
  });

  // state for accessing the Selected room details by the user
  const [bookingOverViewRoomDetails, setBookingOverViewRoomDetails] = useState<
    any[]
  >([]);

  console.log(roomListArrayNumber , form1.roomDetail.length);

  /////////////////// displaying all the room details according to the order of occupancy /////////////////////
  const rooms = roomList[roomListArrayNumber]?.map((item: any, i: number) => {

    // getting the starting price from the packages insider room details
    const packagePrice = item.packages;
    const sortedPackagePrice = packagePrice.sort(
      (a: any, b: any) => a.cost - b.cost
    );
    const startingPrice = sortedPackagePrice[0].cost;

    return (
      <SingleRoom
        key={i}
        setCurrentRoomDetails={setCurrentRoomDetails}
        handleViewRateToggle={handleViewRateToggle}
        roomDetail={item}
        startingPrice={startingPrice}
      />
    );
  });

  // rendering the packages of the selected room details
  const roomPackages = currentRoomPackageDetails?.packages?.map(
    (singlePackage: any, i: number) => (
      <RoomPackage
        key={i}
        singlePackage={singlePackage}
        setRoomListArrayNumber={setRoomListArrayNumber}
        roomDetail={currentRoomPackageDetails}
        handleViewRateToggle={handleViewRateToggle}
        setBookingOverViewRoomDetails={setBookingOverViewRoomDetails}
      />
    )
  );

  return (
    <>
      <MiniHeader />
      <div
        className={`w-full h-full min-h-screen bg-no-repeat bg-cover bg-center bg-fixed saturate-150 flex lg:pl-9 flex-col `}
        style={style}
      >
        <div className={`lg:w-3/4 ${toggleViewRate && "hidden"}`}>
          <div className="mt-12 lg:max-w-[250px]">
            <BookingProgress number={2} bookingForm1Detais={location?.state} />
          </div>
          {roomListArrayNumber === roomList.length ? (
          <div className="text-white text-2xl md:text-4xl py-3 mb-5 px-8">
            Book your rooms
          </div>) : (
            <div className="text-white text-2xl md:text-4xl py-3 mb-5 px-8">
            Choose your room
          </div>
          )}
          {rooms}
        </div>

        <div
          className={`mt-16 md:w-2/3 self-center lg:self-start ${
            !toggleViewRate && "hidden"
          }`}
        >
          <div
            className="relative h-48 w-full bg-cover flex flex-col text-center justify-center items-center bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.3)), url(https://res.cloudinary.com/dhcvbjebj/image/upload/v1682508703/jumeirah-creekside-hotel-family-suite16-9_landscape_whjtxv.jpg)`,
            }}
          >
            <span className="text-white text-lg lg:text-4xl">
              Choose Your Rate for
            </span>
            <span className="text-white text-lg lg:text-4xl">Family suite</span>
            <span
              onClick={() => handleViewRateToggle()}
              className="absolute top-8 left-8 text-white flex gap-3 invisible lg:visible cursor-pointer"
            >
              <HiArrowLongLeft className=" text-3xl" />
              Rooms
            </span>
          </div>
          <div className="p-5 lg:p-14 rounded bg-white">{roomPackages}</div>
        </div>
        {roomListArrayNumber === form1.roomDetail.length && (
          <BookingDetails bookingOverViewRoomDetails={bookingOverViewRoomDetails} form1Values={form1} />
        )}
      </div>
      <BookingOverview
        bookingOverViewRoomDetails={bookingOverViewRoomDetails}
        handleViewRateToggle={handleViewRateToggle}
        toggleViewRate={toggleViewRate}
        form1Values={form1}
        toggleOverview={toggleOverview}
        viewOverView={viewOverView}
        setBookingOverViewRoomDetails={setBookingOverViewRoomDetails}
        setRoomListArrayNumber={setRoomListArrayNumber}
        setToggleViewRate={setToggleViewRate}
      />
    </>
  );
}

export default BookingStayPage;
