import React, { useEffect } from "react";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";


type props = {
    singlePackage:any
    roomName: string,
    handleViewRateToggle: () => void
    setBookingOverViewRoomDetails: React.Dispatch<any>
    setRoomListArrayNumber: React.Dispatch<React.SetStateAction<number>>
    roomListLength: number
    roomListArrayNumber: number
}

function RoomPackage({roomListArrayNumber, singlePackage, setRoomListArrayNumber, roomName, handleViewRateToggle, setBookingOverViewRoomDetails, roomListLength}: props) {

    const navigate = useNavigate()

    useEffect(() => {
        if(roomListArrayNumber === roomListLength){
            // we need to call a backend api
            navigate('/booking/confirm')
        }
    })

    const features = singlePackage.features.map((feature: string, i: number) => (
        <div className="flex" key={feature}>
            <span>{i+1}.</span>
            {feature}
          </div>
    ))

    const handleSelectRate = () => {
        handleViewRateToggle()
        setBookingOverViewRoomDetails((state: any) => [...state, {roomName: roomName, packageName: singlePackage.packageName, packageCost: singlePackage.cost}])
        setRoomListArrayNumber((state) => state + 1 )
    }

  return (
    <div className="bg-[#D9D9D9] p-8 flex flex-col gap-6 mb-10 rounded">
      <div className="text-center lg:text-left text-xl lg:text-3xl">{singlePackage.packageName}</div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col text-xs lg:text-sm gap-2 lg:w-3/5">
          {features}
        </div>
        <div className="text-center lg:w-2/5">
          <div className="flex gap-4 justify-center items-center">
            <div className="font-sans">INR</div>
            <div className="text-4xl">{singlePackage.cost.toLocaleString('en-IN')}</div>
          </div>
          <div className="text-xs">exc. taxes and fees</div>
          <Button class="w-full lg:w-52 my-5 text-sm" color="transparent" onClick={handleSelectRate}>
            SELECT THIS RATE
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RoomPackage;
