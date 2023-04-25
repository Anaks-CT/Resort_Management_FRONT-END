import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MiniHeader from "../../components/User/Header/MiniHeader";
import { AiOutlineCaretDown } from "react-icons/ai";
import BookingProgress from "../../components/User/BookingProgress";
import { TbArrowsMove } from "react-icons/tb";
import { BsPeopleFill } from "react-icons/bs";
import BookingOverview from "../../components/User/booking/BookingOverview";
import RoomDetails from "../../components/User/room/RoomDetails";
import Button from "../../components/UI/Button";

function BookingStayPage() {
  const [viewOverView, setViewOverView] = useState(false);
  const [viewDetails, setViewDetails] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const availableRoomTypes = location?.state?.data;
  console.log(availableRoomTypes);
  // useEffect(() => {
  //   if(!availableRoomTypes){
  //     navigate('/booking/explore')
  //   }
  // })
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.3)), url(https://res.cloudinary.com/dhcvbjebj/image/upload/v1682333333/pexels-asad-photo-maldives-1268871_crcnzg.jpg)`,
  };

  const toggleOverview = () => setViewOverView(!viewOverView)
  return (
    <>
      <MiniHeader />
      <div
        className="w-full h-full bg-no-repeat bg-cover bg-center bg-fixed saturate-150 flex flex-col"
        style={style}
      >
        <div className="lg:w-3/4 ">
        <div className="mt-12 lg:max-w-[250px]">
        <BookingProgress number={2} />
        </div>
        <div className="text-white text-2xl py-3 mb-5 px-8">Choose your room</div>
        <div className="p-6 bg-white mb-52 ">
          <div className="lg:flex items-start lg:gap-10">
          <img className="lg:max-w-[250px] md:py-6 object-contain rounded-lg" src="https://cdn.jumeirah.com/-/mediadh/dh/hospitality/jumeirah/hotels/dubai/burj-al-arab-jumeirah/new-suites/ret_0390suite.jpg?h=1080&w=1620" alt="" />
          <div>
            <div className="py-6"><span className="text-2xl whitespace-nowrap">Deluxe Marina Suite</span></div>
            <span className="font-sans text-sm ">Enjoy ocean views, a king-sized bed and the comfort of a private living room in one of Dubai's most exclusive properties.</span>
            <div className="py-5 flex gap-7">
              <div className="flex items-center gap-1">
                <TbArrowsMove className="text-3xl" />
                <span>170m2</span>
              </div>
              <div className="flex items-center gap-2">
                <BsPeopleFill className="text-2xl" />
                <span>Sleeps 4</span>
              </div>
            </div>
        <div className="pb-8">
          <div onClick={() => setViewDetails(!viewDetails)} className="text-premium cursor-pointer flex items-center gap-2">
            {!viewDetails ? "VIEW DETAILS" : "HIDE DETAILS"}
            <AiOutlineCaretDown />
          </div>
          {viewDetails && <div className="py-5 border-y mt-8 block lg:hidden">
            <RoomDetails />
          </div>}
        </div>
          </div>
        <div className="w-64">
        <div className="flex p-2 flex-col items-center gap-2 md:p-7">
          <p className="text-premium font-sans tracking-wide whitespace-nowrap">STARTING FROM</p>
          <div className="flex gap-4 items-center">
            <div className="font-sans">INR</div>
            <div className="text-4xl">98,564</div>
          </div>
          <div className="text-xs">exc. taxes and fees</div>
        </div> 
          <Button class="w-full  my-5 text-sm" color="premium" >VIEW RATES FOR THIS ROOM</Button>
        </div>
          </div>
        {viewDetails && <div className="py-5 border-y mt-8 hidden lg:block">
            <RoomDetails />
          </div>}
        </div>
        </div>
        
        <BookingOverview toggleOverview={toggleOverview} viewOverView={viewOverView} />
      </div>
    </>
  );
}

export default BookingStayPage;
